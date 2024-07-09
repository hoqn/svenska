import { getCollection } from "astro:content";

export async function getPostTagCollection(): Promise<string[]> {
  const postsWithTags = await getCollection("posts", it => it.data.tags);

  const set = new Set<string>(postsWithTags.flatMap<string>(it => it.data.tags as string[]));

  const arr = [...set];
  arr.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : +1);

  return arr;
}