import { getCollection } from "astro:content";

export async function getPostTagCollection(): Promise<string[]> {
  const postsWithTags = await getCollection("posts", it => it.data.tags);

  const set = new Set<string>(postsWithTags.flatMap<string>(it => it.data.tags as string[]));

  const arr = [...set];
  arr.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : +1);

  // 'react'와 'React'처럼 대소문자만 차이날 경우 하나로 합침
  return arr.reduce((acc, it) => {
    const last = acc[acc.length - 1];

    if (last && last.toLowerCase() === it.toLowerCase()) {
      return acc;
    }

    return [...acc, it];
  }, [] as typeof arr);
}