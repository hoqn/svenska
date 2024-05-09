import { defineCollection, reference, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),

    // series: z.string().optional(),
    series: reference("serieses").nullish(),
    tags: z.array(z.string()).nullable().optional(),
    categories: z.array(z.string()).nullable().optional(),
    // categories: z.array(reference("categories")).nullable().optional(),

    toc: z.boolean().default(false),

    created_at: z.date(),
    edited_at: z.date().optional(),

    draft: z.boolean().nullish(),
  }),
});

const pages = defineCollection({
  type: "content",
});

// const categories = defineCollection({
//   type: "data",
//   schema: z.object({
//     id: z.string(),
//     name: z.string(),
//     children: z.array(reference("categories")).nullable().optional(),
//   }),
// });

const serieses = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).nullish(),
  }),
});

const works = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      stacks: z.array(z.string()).nullish(),
      start_date: z.date().nullish().or(z.string()),
      end_date: z.date().nullish().or(z.string()),
      icon: image().or(z.string()).nullish(),
      links: z.record(z.string(), z.string()).nullish(),
    }),
});

export const collections = {
  posts,
  pages,
  // categories,
  serieses,
  works,
};
