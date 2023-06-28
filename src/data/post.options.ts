export type ShowType = {
  display: string;
  key: string;
  indexHref?: string;
};

export default {
  showTypes: [
    {
      display: "모든 글",
      key: "post",
      indexHref: "/post"
    },
    {
      display: "카테고리",
      key: "category",
      indexHref: "/category",
    },
    {
      display: "시리즈",
      key: "series",
      indexHref: "/series",
    },
    {
      display: "태그",
      key: "tag",
      indexHref: "/tag",
    },
  ]
} satisfies {
  showTypes: ShowType[];
};
