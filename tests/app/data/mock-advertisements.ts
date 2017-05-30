import { Advertisement } from "../../../src/app/data/advertisement";
export function getAdvertisementMocks() : Advertisement[] {
  return [{
    id: 1,
    advertisementState: 2,
    category: {id: 1, name: "Jobs", parent: null},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      passwordHash: "abc",
      passwordPlaintext: "abc",
      jwtToken: "",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      updated: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    media: null,
    title: "Bsys",
    description: "Betriebsysteme Buch von Eduard Glatz mit Notizen ",
    price: 30000,
    created: new Date("Apr 28, 2017 12:30:17 PM"),
    updated: new Date("Apr 28, 2017 12:30:17 PM"),
    tags: [{id: 1, name: "Eduard Glatz"}, {id: 11, name: "Informatik"}, {
      id: 2,
      name: "Betriebssysteme 1"
    }]
  }, {
    id: 16,
    advertisementState: 2,
    category: {id: 1, name: "Jobs", parent: null},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      passwordHash: "abc",
      passwordPlaintext: "abc",
      jwtToken: "",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      updated: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    media: null,
    title: "Tutorat An2I, Augenstein",
    description: "Suche Nachhilfe in Mathe",
    price: 2000,
    created: new Date("Apr 28, 2017 12:30:27 PM"),
    updated: new Date("Apr 28, 2017 12:30:17 PM"),
    tags: [{id: 11, name: "Informatik"}, {id: 12, name: "An2I"}]
  }, {
    id: 17,
    advertisementState: 2,
    category: {id: 3, name: "WG Zimmer", parent: null},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      passwordHash: "abc",
      passwordPlaintext: "abc",
      jwtToken: "",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      updated: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    media: null,
    title: "WG Zimmer in Rapperswil",
    description: "Suchen netten Mitbewohner",
    price: 60000,
    created: new Date("Apr 28, 2017 12:38:19 PM"),
    updated: new Date("Apr 28, 2017 12:30:17 PM"),
    tags: [{id: 20, name: "FRESH"}, {id: 15, name: "Rapperswil"}]
  }, {
    id: 19,
    advertisementState: 2,
    category: {id: 1, name: "Jobs", parent: null},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      passwordHash: "abc",
      passwordPlaintext: "abc",
      jwtToken: "",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      updated: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    media: null,
    title: "Sommerjob",
    description: "schlecht bezahlt",
    price: 500,
    created: new Date("May 1, 2017 9:16:30 AM"),
    updated: new Date("Apr 28, 2017 12:30:17 PM"),
    tags: [{id: 21, name: "temporär"}]
  }]
}