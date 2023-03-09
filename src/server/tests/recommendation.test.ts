/* eslint-disable prefer-destructuring */
import * as voteSessionService from '../services/voteSessionService';
import { VotingSession } from '../models/votingSessionModel';
import { VoteMediaRec } from '../models/voteMediaModel';
import * as prefService from '../services/prefService';

const sampleGroupId = '9801f390-3b25-4869-9925-6cfc05521477';
let sessionid = '';
let medias = [] as VoteMediaRec[];

describe('Recommendation Test Cases', () => {
  test('Start a Voting Session', async () => {
    let res = await voteSessionService.addSessionForGroup(sampleGroupId);
    if (!res) {
      res = {} as VotingSession;
    }
    expect(res.sessionId).toBeDefined();
    expect(res.isDone).toBeFalsy();
    console.log(res.sessionId);
    sessionid = res.sessionId;
  });

  test('Load Recommendations', async () => {
    await prefService.addPref('test-id-2');
    await prefService.addPref('test-id-3');

    let res = await voteSessionService.loadRecommendations(sessionid, sampleGroupId, true);
    if (!res) {
      res = {} as VotingSession;
    }
    expect(res.sessionId).toBeDefined();
    expect(res.recommendations.length).toBe(20);
    medias = res.recommendations;
  });

  test('Submit Votes', async () => {
    const vote1 = await voteSessionService.submitUserVote(sessionid, 'test-id-1', medias[3].name, '2');
    let vote2 = await voteSessionService.submitUserVote(sessionid, 'test-id-2', medias[3].name, '1');
    if (!vote2) {
      vote2 = {} as VotingSession;
    }
    expect(vote2.recommendations[3].userVotes.length).toBe(2);
  });

  test('Find Best Match', async () => {
    let res = await voteSessionService.computeMatch(sessionid);
    if (!res) {
      res = {} as VoteMediaRec;
    }
    expect(res.name).toBe(medias[3].name);
  });
});
