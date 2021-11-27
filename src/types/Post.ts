import type { User } from './User'

export interface Post {
  url: string;
  title: string;
  content: string;
  imagePath: string;
  creator: User;
}
