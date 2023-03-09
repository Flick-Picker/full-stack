import { DocumentData } from 'firebase/firestore/lite';
import * as userService from '../services/userService';
import * as groupService from '../services/groupService';
import * as inviteService from '../services/inviteService';

let groupId = '';
let inviteId = '';

describe('Group Test Cases', () => {
  test('Create a group', async () => {
    let res = await groupService.addGroup('Jest Group', 'test-id-1');
    if (!res) {
      res = {} as DocumentData;
    }
    console.log(res.groupId);
    expect(res.groupName).toBe('Jest Group');
    expect(res.groupId).toBeDefined();
    expect(res.ownerUid).toBe('test-id-1');
    groupId = res.groupId;
  });

  test('Add user to group', async () => {
    let newuser = await userService.addUser('test-id-2', 'jest2@test.com');
    if (!newuser) {
      newuser = {} as DocumentData;
    }
    expect(newuser.email).toBe('jest2@test.com');

    let group = await groupService.addUserToGroup(groupId, 'test-id-2');
    if (!group) {
      group = {} as DocumentData;
    }
    expect(group.users).toContain('test-id-2');
  });

  test('Invite a user to group', async () => {
    let newuser = await userService.addUser('test-id-3', 'jest3@test.com');
    if (!newuser) {
      newuser = {} as DocumentData;
    }
    expect(newuser.email).toBe('jest3@test.com');

    let res = await inviteService.sendGroupInvite(groupId, 'Jest Group', 'test-id-1', 'test-id-3');
    if (!res) {
      res = {} as DocumentData;
    }
    expect(res.senderUser).toBe('test-id-1');
    expect(res.requestedUser).toBe('test-id-3');
    expect(res.isAccepted).toBeFalsy();
    inviteId = res.inviteId;
  });

  test('Accept Invite to group', async () => {
    let res = await inviteService.acceptGroupInvite(inviteId, groupId, 'test-id-1', 'test-id-3');
    if (!res) {
      res = {} as DocumentData;
    }
    console.log(res.inviteId);
    expect(res.senderUser).toBe('test-id-1');
    expect(res.requestedUser).toBe('test-id-3');
    expect(res.isAccepted).toBeTruthy();

    // check if group also has user now
    let group = await groupService.getGroup(groupId);
    if (!group) {
      group = {} as DocumentData;
    }
    expect(group.users).toContain('test-id-3');
  });
});
