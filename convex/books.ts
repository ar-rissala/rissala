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
    language: v.optional(v.union(v.literal("fr"), v.literal("en"), v.literal("ar"))),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("books").order("desc");
    
    if (args.language) {
      q = ctx.db.query("books").withIndex("by_language", (q) => q.eq("language", args.language!));
    }
    
    let books = await q.collect();
    
    if (args.published !== undefined) {
      books = books.filter(b => b.published === args.published);
    }
    
    // Join with category and resolve cover URLs
    return await Promise.all(
      books.map(async (book) => {
        const category = await ctx.db.get(book.categoryId);
        
        let coverUrl = null;
        if (book.coverStorageId) {
          coverUrl = await ctx.storage.getUrl(book.coverStorageId);
        }
        
        // Don't expose pdfUrl directly in list for security if they are protected
        // But for admin, they might want to download it.
        // We will generate the secure download link via our HTTP route (/api/pdf?id=...)
        
        return {
          ...book,
          category,
          coverUrl,
        };
      })
    );
  },
});

export const getById = query({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    const book = await ctx.db.get(args.id);
    if (!book) return null;
    
    const category = await ctx.db.get(book.categoryId);
    
    let coverUrl = null;
    if (book.coverStorageId) {
      coverUrl = await ctx.storage.getUrl(book.coverStorageId);
    }
    
    return {
      ...book,
      category,
      coverUrl,
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    author: v.string(),
    description: v.string(),
    coverStorageId: v.optional(v.id("_storage")),
    pdfStorageId: v.id("_storage"),
    language: v.union(v.literal("fr"), v.literal("en"), v.literal("ar")),
    categoryId: v.id("categories"),
    published: v.boolean(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);

    const existing = await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error("Un livre avec ce slug existe déjà.");
    }
    
    const now = Date.now();
    return await ctx.db.insert("books", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("books"),
    title: v.string(),
    slug: v.string(),
    author: v.string(),
    description: v.string(),
    coverStorageId: v.optional(v.id("_storage")),
    pdfStorageId: v.optional(v.id("_storage")), // optional for update if not changed
    language: v.union(v.literal("fr"), v.literal("en"), v.literal("ar")),
    categoryId: v.id("categories"),
    published: v.boolean(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const { id, ...data } = args;
    
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Livre introuvable");
    
    // If we passed a new pdfStorageId, use it, else keep old
    const finalPdfStorageId = data.pdfStorageId || existing.pdfStorageId;
    
    return await ctx.db.patch(id, {
      ...data,
      pdfStorageId: finalPdfStorageId,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    await requireAdminOrEditor(ctx);
    
    const book = await ctx.db.get(args.id);
    if (!book) throw new Error("Livre introuvable");
    
    if (book.coverStorageId) {
      await ctx.storage.delete(book.coverStorageId);
    }
    if (book.pdfStorageId) {
      await ctx.storage.delete(book.pdfStorageId);
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
