import classnames from 'classnames/bind';
import $ from './PostTypes.module.scss';

import type { ShowType } from '@/data/post.options';

const cx = classnames.bind($);

export interface PostTypesProps {
  types: ShowType[]
}

export default function PostTypes({ types }: PostTypesProps) {
  return (
    <ul className={cx("post-types")}>
      {
        types.map(({ key, display, indexHref }) => (
          <li className={cx("post-types__item", "post-type")}>
            <a className={cx("post-type__inner")} href={indexHref}>{display}</a>
          </li>
        ))
      }
    </ul>
  )
}