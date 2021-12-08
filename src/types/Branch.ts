import type { Post } from './Post'

export interface Branch {
  symbol: string;
  head: Post;
  from: Post;
}
