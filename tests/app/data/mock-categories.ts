import { Category } from "../../../src/app/data-classes/category";

export function getCategoriesMocks(): Category[] {
  return [{id: 1, name: "Jobs", parent: null}, {id: 3, name: "WG Zimmer", parent: null}]
}