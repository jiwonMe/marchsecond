import { Branch } from './Branch'

export interface Repository {
  symbol: string;
  branches: Map<string, Branch>;
  currentBranch: Branch;
}
