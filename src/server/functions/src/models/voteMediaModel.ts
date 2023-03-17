export interface HistoryMedia {
  mediaName: string;
  timeCreated: string;
  hasVoteFinished: boolean;
  userVotes: UserVote[];
  voteRating: number;
}

export interface VoteMediaRec {
  name: string;
  imageURL: string;
  algorithmRating: number;
  hasVoteStarted: boolean;
  hasVoteFinished: boolean;
  userVotes: UserVote[];
  voteRating: number;
  userVoteSet: string[];
}

export interface UserVote {
  uid: string;
  vote: number; // 0 for neutral, 1 for like, -1 for dislike
  timeVoted: string;
}
