import PostListItem from "./PostListItem";

import classnames from 'classnames/bind';
import $ from './PostList.module.scss';

const cx = classnames.bind($);

import type { CollectionEntry } from "astro:content";

export interface PostListProps {
  posts: CollectionEntry<"posts">[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className={cx("post-list")}>
      {
        posts.map((post) => (
          <li key={post.id} className={cx("post-list__item")}>
            <PostListItem post={post} />
          </li>
        ))
      }
    </ul>
  )
}