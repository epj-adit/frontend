// Simulate the behavior of a RESTy web api backed by the simple in-memory data store
// provided by the injected InMemoryDataService service.

import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryAdvertisementService implements InMemoryDbService {
    createDb() {
        let advertisements = [
            {
                id: 10,
                title: "Bsys Buch",
                price: 1,
                description: "Bsys Buch von E. Glatz für Bsys1&2. Auflage 3, 2015",
                advertisementState: null,
                created: new Date(Date.now()),
                updated: new Date(Date.now()),
                tags: [{id: 20, name: "Informatik"}, {id: 21, name:"Bsys"}],
                advertiser: 1,
                category: null,
                media: [{
                    id: 100,
                    filename: "test",
                    description: "blubb"
                }, {
                    id: 101,
                    filename: "test",
                    description: "blubb"
                }]
            },
            {
                id: 11,
                title: "UML Patterns",
                price: 2,
                description: "Larman für SE1",
                advertisementState: null,
                created: Date.now(),
                updated: Date.now(),
                tags: [{id: 20, name: "Informatik"}],
                advertiser: 2,
                category: null,
                media: []
            },
        ];
        return { advertisements };
    }
}
