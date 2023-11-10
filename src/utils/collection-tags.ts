import { getCollection } from "astro:content";

export async function getPostTagCollection(): Promise<string[]> {
  const postsWithTags = await getCollection("posts", ({ data: { tags } }) => !!tags && tags.length);

  const ret = new Set<string>();
  postsWithTags.forEach(({ data: { tags } }) => (!!tags && tags.length) && tags.forEach((tag) => ret.add(tag)));

  return Array.from(ret);
}