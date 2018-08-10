import superagent from 'superagent';
import bearerAuth from 'superagent-auth-bearer';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
// import { createAccountMockPromise } from './lib/account-mock';
// import { createProfileMockPromise, removeAllResources } from './lib/profile-mock';
import { createWhitelistMockPromise, removeWhitelistResources } from './lib/whitelist-mock';
import logger from '../lib/logger';

bearerAuth(superagent);

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('TESTING ROUTER WHITELIST', () => {
  let mockData;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    await removeWhitelistResources();
    try {
      mockData = await createWhitelistMockPromise();
      whitelist = mockData.whitelist; // eslint-disable-line
    } catch (err) {
      return logger.log(logger.error, `Unexpected error in whitelist-router beforeEach: ${err}`);
    }
    return undefined;
  });

  describe('POST WHITELIST ROUTES TESTING', () => {
    test('POST 200 to /api/whitelists for successful creation', async () => {
      const mockWhitelist = { 
        email: faker.internet.email(),
        role: 'admin',
      };
      let response;
      try {
        response = await superagent.post(`${apiUrl}/whitelists`)
          .send(mockWhitelist);
      } catch (err) {
        expect(err).toEqual('POST 200 test that should pass');
      }
      expect(response.status).toEqual(200);
      expect(response.body.role).toEqual(mockWhitelist.role);
      expect(response.body.email).toEqual(mockWhitelist.email);
    });

    // test('POST 400 to /api/whitelists for successful authent', async () => {
    //   try {
    //     const response = await superagent.post(`${apiUrl}/whitelists`)
    //       .set()
    //   }
    // })
    // test('POST 400 to /api/whitelists for successful authent')
  });

  // describe('GET WHITELIST ROUTES TESTING', () => {
  //   test('GET 200 to /api/whitelists for successful authent')
  //   test('GET 400 to /api/whitelists for successful authent')
  //   test('GET 400 to /api/whitelists for successful authent')
  // });

  // describe('PUT WHITELIST ROUTES TESTING', () => {
  //   test('PUT 200 to /api/whitelists for successful authent')
  //   test('PUT 400 to /api/whitelists for successful authent')
  //   test('PUT 400 to /api/whitelists for successful authent')
  // });

  // describe('DELETE WHITELIST ROUTES TESTING', () => {
  //   test('DELETE 200 to /api/whitelists for successful authent')
  //   test('DELETE 400 to /api/whitelists for successful authent')
  //   test('DELETE 400 to /api/whitelists for successful authent')
  // });
});