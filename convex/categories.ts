import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Middleware to check admin role
const requireAdmin = async (ctx: any) => {
  const userId = await auth.getUserId(ctx);
  if (!userId) throw new Error("Non authentifié");
  
  const user = await ctx.db.get(userId);
  if (!user || user.role !== "admin") {
    throw new Error("Accès refusé. Réservé aux administrateurs.");
  }
  return user;
};

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").order("asc").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    order: v.number(),
    active: v.boolean(),
    icon: v.optional(v.string()),
    name: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    description: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error("Une catégorie avec ce slug existe déjà.");
    }

    return await ctx.db.insert("categories", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("categories"),
    slug: v.string(),
    order: v.number(),
    active: v.boolean(),
    icon: v.optional(v.string()),
    name: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
    description: v.object({
      fr: v.optional(v.string()),
      en: v.optional(v.string()),
      ar: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    
    // Check if category has articles
    const articles = await ctx.db
      .query("articles")
      .withIndex("by_categoryId", (q) => q.eq("categoryId", args.id))
      .first();
      
    if (articles) {
      throw new Error("Impossible de supprimer cette catégorie car elle contient des articles.");
    }

    await ctx.db.delete(args.id);
  },
});
