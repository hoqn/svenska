import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    
    series: z.string().optional(),
    tags: z.array(z.string()).nullable().optional(),
    categories: z.array(z.string()).nullable().optional(),

    toc: z.boolean().default(false),

    created_at: z.date(),
    edited_at: z.date().optional(),
  }),
});

const pagesCollection = defineCollection({
  type: "content",
});

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
};
