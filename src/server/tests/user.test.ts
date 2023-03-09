import { DocumentData } from 'firebase/firestore/lite';
import * as userService from '../services/userService';
import * as prefService from '../services/prefService';
import { Preference } from '../models/prefModel';

describe('User Test Cases', () => {
  test('Create a user', async () => {
    let res = await userService.addUser('test-id-1', 'jesttest1@test.com');
    if (!res) {
      res = {} as DocumentData;
    }
    expect(res.email).toBe('jesttest1@test.com');
  });

  test('Edit user profile', async () => {
    let res = await userService.updateUsername('test-id-1', 'JestTester');
    if (!res) {
      res = {} as DocumentData;
    }
    expect(res.username).toBe('JestTester');
  });

  test('New preferences for a user', async () => {
    let res = await prefService.addPref('test-id-1');
    if (!res) {
      res = {} as DocumentData;
    }
    expect(res.uid).toBe('test-id-1');
  });

  test('Edit user preferences', async () => {
    const prefs : Preference = {
      uid: 'test-id-1',
      likedGenres: ['action'],
      dislikedGenres: ['comedy'],
      animePreference: 1,
      moviePreference: 2,
      tvShowPreference: 0,
      preferredRatings: 1,
    };

    let res = await prefService.updatePref(prefs);
    if (!res) {
      res = {} as DocumentData;
    }
    expect(res.uid).toBe('test-id-1');
    expect(res.likedGenres).toContain('action');
    expect(res.moviePreference).toBe(2);
  });
});
