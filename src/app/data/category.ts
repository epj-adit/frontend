export class Category {
  id: number;
  parent: Category;
  name: string;
  constructor(name: string){
    this.name = name;
  }
}