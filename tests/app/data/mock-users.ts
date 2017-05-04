import { User } from "../../../src/app/data/user";
export function getUsersMocks(): User[] {
  return [{
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
  }, {
    id: 2,
    username: "muster",
    email: "muster@hsr.ch",
    passwordHash: "abc",
    passwordPlaintext: "abc",
    jwtToken: "",
    isActive: true,
    isPrivate: true,
    wantsNotification: true,
    created: "Apr 28, 2017 12:30:17 PM",
    updated: "Apr 28, 2017 12:30:17 PM",
    role: {id: 3, name: "user", permissions: []}
  }]
}