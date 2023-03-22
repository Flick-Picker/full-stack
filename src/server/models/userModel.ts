export interface User {
  uid: string;
  email: string;
  username: string;
  name: string;
  friends: any[];
  groupsOwned: any[];
  groupsJoined: any[];
  currentVotingSession: string;
}
