export function getAdvertisementMocks() {
  return [{
    id: 1,
    advertisementState: 2,
    category: {id: 1, name: "Jobs"},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    title: "Bsys",
    description: "Betriebsysteme Buch von Eduard Glatz mit Notizen ",
    price: 30000,
    created: "Apr 28, 2017 12:30:17 PM",
    tags: [{id: 1, name: "Eduard Glatz"}, {id: 11, name: "Informatik"}, {
      id: 2,
      name: "Betriebssysteme 1"
    }]
  }, {
    id: 16,
    advertisementState: 2,
    category: {id: 1, name: "Jobs"},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    title: "Tutorat An2I, Augenstein",
    description: "Suche Nachhilfe in Mathe",
    price: 2000,
    created: "Apr 28, 2017 12:30:27 PM",
    tags: [{id: 11, name: "Informatik"}, {id: 12, name: "An2I"}]
  }, {
    id: 17,
    advertisementState: 2,
    category: {id: 3, name: "WG Zimmer"},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    title: "WG Zimmer in Rapperswil",
    description: "Suchen netten Mitbewohner",
    price: 60000,
    created: "Apr 28, 2017 12:38:19 PM",
    tags: [{id: 20, name: "FRESH"}, {id: 15, name: "Rapperswil"}]
  }, {
    id: 19,
    advertisementState: 2,
    category: {id: 1, name: "Jobs"},
    user: {
      id: 3,
      username: "student",
      email: "student@hsr.ch",
      isActive: true,
      isPrivate: true,
      wantsNotification: true,
      created: "Apr 28, 2017 12:30:17 PM",
      role: {id: 3, name: "user", permissions: []}
    },
    title: "Sommerjob",
    description: "schlecht bezahlt",
    price: 500,
    created: "May 1, 2017 9:16:30 AM",
    tags: [{id: 21, name: "temporär"}]
  }]
}