import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

type WorkWithoutDetailedPage = {
  title: string;
  icon: string | ImageMetadata;
  startDate?: string | Date;
  endDate?: string | Date;
  stacks: string[];
  summary?: string;
  roles?: string | string[];
};

type WorkWithDetailedPage = Partial<WorkWithoutDetailedPage> & {
  slug: CollectionEntry<"works">["slug"];
};

export type Work = WorkWithDetailedPage | WorkWithoutDetailedPage;

export function hasDetailedPage(work: Work): work is WorkWithDetailedPage {
  return "slug" in work;
}
