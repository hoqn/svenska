import format from "date-fns/format/index";
import ko from "date-fns/locale/ko/index";

import classnames from "classnames/bind";
import $ from "./PostListItem.module.scss";

import type { CollectionEntry } from "astro:content";

const cx = classnames.bind($);

interface PostListItemProps {
  post: CollectionEntry<"posts">;
}

export default function PostListItem({ post: { data, slug } }: PostListItemProps) {
  const createdAt = data.created_at && format(data.created_at, "PPP", { locale: ko });
  const editedAt = data.edited_at && format(data.edited_at, "PPP", { locale: ko });

  return (
    <a className={cx("list-item")} href={`/post/${slug}`}>
      <div className={cx("list-item__inner")}>
        <h3 className={cx("list-item__title")}>{data.title}</h3>
        {data.subtitle && <h5 className={cx("list-item__subtitle")}>{data.subtitle}</h5>}
        <div className={cx("list-item__meta")}>
          {data.tags && (
            <ul className={cx("list-item__tags")}>
              {data.tags.map((tag) => (
                <li key={tag} className={cx("list-item__tag")}>
                  <a className={cx("list-item__tag-link")} href={`/tag/${tag}`}>
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {createdAt && <span className={cx("list-item__date", "list-item__date--created")}>{createdAt} 작성</span>}
          {editedAt && <span className={cx("list-item__date", "list-item__date--edited")}>{editedAt} 수정</span>}
        </div>
      </div>
    </a>
  );
}
