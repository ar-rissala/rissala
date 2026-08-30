import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

const requireAdminOrEditor = async (ctx: any) => {
  const userId = await auth.getUserId(ctx);
  if (!userId) throw new Error("Non authentifié");
  
  const user = await ctx.db.get(userId);
  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    throw new Error("Accès refusé. Réservé aux administrateurs et éditeurs.");
  }
  return user;
};

export const list = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("articles").order("desc");
    
    if (args.status) {
      q = ctx.db.query("articles").withIndex("by_status", (q) => q.eq("status", args.status!));
    }
    
    const articles = await q.collect();
    
    // Join with category and author
    return await Promise.all(
      articles.map(async (article) => {
        const category = await ctx.db.get(article.categoryId);
        const author = await ctx.db.get(article.authorId);
        
        // Resolve cover URL if exists
        let coverUrl = null;
        if (article.coverStorageId) {
          coverUrl = await ctx.storage.getUrl(article.coverStorageId);
        }
        
        return {
          ...article,
          category,
          author: {
            id: author?._id,
            pseudo: author?.pseudo,
            name: author?.name,
            image: author?.image,
          },
          coverUrl,
        };
      })
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const article = await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
      
    if (!article) return null;
    
    const category = await ctx.db.get(article.categoryId);
    const author = await ctx.db.get(article.authorId);
    
    let coverUrl = null;
    if (article.coverStorageId) {
      coverUrl = await ctx.storage.getUrl(article.coverStorageId);
    }
    
    return {
      ...article,
      category,
      author: {
        id: author?._id,
        pseudo: author?.pseudo,
        name: author?.name,
        image: author?.image,
      },
      coverUrl,
    };
  },
});

export const getById = query({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.id);
      
    if (!article) return null;
    
    const category = await ctx.db.get(article.categoryId);
    const author = await ctx.db.get(article.authorId);
    
    let coverUrl = null;
    if (article.coverStorageId) {
      coverUrl = await ctx.storage.getUrl(article.coverStorageId);
    }
    
    return {
      ...article,
      category,
      author: {
        id: author?._id,
        pseudo: author?.pseudo,
        name: author?.name,
        image: author?.image,
      },
      coverUrl,
    };
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    categoryId: v.id("categories"),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    featured: v.boolean(),
    coverStorageId: v.optional(v.id("_storage")),
    title: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    excerpt: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    content: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    seoTitle: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    seoDescription: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const user = await requireAdminOrEditor(ctx);

    const existing = await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error("Un article avec ce slug existe déjà.");
    }
    
    const now = Date.now();
    const publishedAt = args.status === "published" ? now : undefined;

    return await ctx.db.insert("articles", {
      ...args,
      authorId: user._id,
      createdAt: now,
      updatedAt: now,
      publishedAt,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("articles"),
    slug: v.string(),
    categoryId: v.id("categories"),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    featured: v.boolean(),
    coverStorageId: v.optional(v.id("_storage")),
    title: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    excerpt: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    content: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    seoTitle: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    seoDescription: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const { id, ...data } = args;
    
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Article introuvable");
    
    let publishedAt = existing.publishedAt;
    if (existing.status !== "published" && data.status === "published") {
      publishedAt = Date.now();
    }

    return await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
      publishedAt,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const article = await ctx.db.get(args.id);
    if (!article) throw new Error("Article introuvable");
    
    if (article.coverStorageId) {
      await ctx.storage.delete(article.coverStorageId);
    }
    
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdminOrEditor(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
