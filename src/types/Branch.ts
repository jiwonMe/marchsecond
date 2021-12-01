import type { Post } from './Post'

export interface Branch {
  name: string;
  head: Post;
  from: Post;
}
