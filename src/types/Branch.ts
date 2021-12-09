import type { Post } from './Post'

export interface Branch {
  symbol: string;
  name: string;
  head: Post;
  from: Post;
  posts: Post[];
}
