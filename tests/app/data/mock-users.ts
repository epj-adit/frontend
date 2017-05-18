import { User } from "../../../src/app/data/user";
export function getUsersMocks(): User[] {
  return [{
    id: 3,
    username: "student",
    email: "student@hsr.ch",
    passwordHash: "abc",
    passwordPlaintext: "abc",
    jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdHJlbnRpbkBoc3IuY2giLCJwZXJtaXNzaW9ucyI6WyJlZGl0X3JvbGUiLCJzdXBlcnZpc29yX3Blcm1pc3Npb24iLCJhZG1pbmlzdHJhdG9yX3Blcm1pc3Npb24iLCJlZGl0X2NhdGVnb3JpZXMiLCJiYXNpY19wZXJtaXNzaW9uIiwicmV2aWV3X2FkdmVydGlzZW1lbnRzIiwiZWRpdF9pc0FjdGl2ZSJdLCJpc3MiOiJhZGl0IiwiZXhwIjoxNDk1MTk1MTQ0fQ.42sSVee4JOFmFHqPnDYwVb771u9pO7rJ49FAzU9m6qU",
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