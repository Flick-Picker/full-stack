// const service = require('../services/userService');
import { DocumentData } from 'firebase/firestore/lite';
import * as service from '../services/userService';

describe('User Test Cases', () => {
  test('Create a user', async () => {
    let res = await service.addUser('test-id-1', 'jesttest1@test.com');
    if (!res) {
      res = {} as DocumentData;
    }
    expect(res.email).toBe('jesttest1@test.com');
  });
});
