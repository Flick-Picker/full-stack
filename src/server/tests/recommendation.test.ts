// const service = require('../services/userService');
import { DocumentData } from 'firebase/firestore/lite';
import * as userService from '../services/userService';
import * as groupService from '../services/groupService';
import * as inviteService from '../services/inviteService';
import { Preference } from '../models/prefModel';

describe('Recommendation Test Cases', () => {
  test('Start recs', async () => {
    let res = await groupService.addGroup('Jest Group', 'test-id-1');
    if (!res) {
      res = {} as DocumentData;
    }
    console.log(res.groupId);
    expect(res.groupId).toBeDefined();
    expect(res.ownerUid).toBe('test-id-1');
  });
});
