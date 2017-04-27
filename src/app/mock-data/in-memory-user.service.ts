// Simulate the behavior of a RESTy web api backed by the simple in-memory data store
// provided by the injected InMemoryDataService service.

import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryUserService implements InMemoryDbService {
  createDb() {
    let users = [
      {
        id: 1,
        username: "annamuster",
        email: "anna.muster@hsr.ch",
        passwordhash: "jdlo8wi7uhd3",
        jwtToken: "ggh27dnmf0",
        isPrivate: false,
        isActive: true,
        wantsNotification: true,
        created: new Date(Date.now()),
        updated: new Date(Date.now()),
        role: null,
        subscriptions: []
      },
      {
        id: 2,
        username: "benjaminB",
        email: "bbluemchen@hsr.ch",
        passwordhash: "jdbe8km4992m",
        jwtToken: "ndji962nd7",
        isPrivate: false,
        isActive: true,
        wantsNotification: true,
        created: new Date(Date.now()),
        updated: new Date(Date.now()),
        role: null,
        subscriptions: []
      }
    ];
    return {users};
  }
}
