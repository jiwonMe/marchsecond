import { Repository } from './Repository'

export interface Post {
  symbol: string;
  title: string;
  content: string;
  imagePath: string;
  creator: string;
  repository: Repository;
}
