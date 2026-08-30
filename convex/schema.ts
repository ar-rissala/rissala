import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    email: v.string(),
    pseudo: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin"), v.literal("editor")),
    preferredLanguage: v.union(v.literal("fr"), v.literal("en"), v.literal("ar")),
    image: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_pseudo", ["pseudo"]),

  articles: defineTable({
    slug: v.string(),
    categoryId: v.id("categories"),
    authorId: v.id("users"),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    featured: v.boolean(),
    coverStorageId: v.optional(v.id("_storage")),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),

    // Multilingual content
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

    // SEO
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
  })
    .index("by_slug", ["slug"])
    .index("by_categoryId", ["categoryId"])
    .index("by_status", ["status"])
    .index("by_publishedAt", ["publishedAt"]),

  categories: defineTable({
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
  }).index("by_slug", ["slug"]),

  books: defineTable({
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_language", ["language"])
    .index("by_categoryId", ["categoryId"]),
});
