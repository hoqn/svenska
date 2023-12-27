import type { CollectionEntry, ImageFunction, z } from "astro:content";

type WorkWithoutDetailedPage = {
  title: string;
  icon: string | z.infer<ReturnType<ImageFunction>>;
  startDate?: string | Date;
  endDate?: string | Date;
  stacks: string[];
  summary?: string;
};

type WorkWithDetailedPage = Partial<WorkWithoutDetailedPage> & {
  slug: CollectionEntry<"works">["slug"];
};

export type Work = WorkWithDetailedPage | WorkWithoutDetailedPage;

export function hasDetailedPage(work: Work): work is WorkWithDetailedPage {
  return "slug" in work;
}
