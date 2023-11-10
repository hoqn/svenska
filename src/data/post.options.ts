export interface ShowTypeRaw {
  display: string;
  key: string;
  indexHref?: string;
};
export type ShowType = typeof postOptions["showTypes"][number];

const postOptions = {
  showTypes: [
    {
      display: "모든 글",
      key: "post",
      indexHref: "/post"
    },
    // {
    //   display: "카테고리",
    //   key: "category",
    //   indexHref: "/category",
    // },
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
  ],
} as const satisfies {
  showTypes: readonly ShowTypeRaw[];
} ;

export default postOptions;
