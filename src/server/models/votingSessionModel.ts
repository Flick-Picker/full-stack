import { HistoryMedia } from './voteMediaModel';

export interface VotingSession {
  sessionId: string;
  isGroup: boolean;
  groupId: string;
  userUid: string;
  isDone: boolean;
  history: HistoryMedia[];
  recommendations: any[];
}
