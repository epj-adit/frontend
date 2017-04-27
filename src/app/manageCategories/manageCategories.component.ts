import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../_services/category.service";
import { Category } from "../data-classes/category";
@Component({
  selector: 'adit-manage-categories',
  templateUrl: './manageCategories.component.html',
  styleUrls: ['./manageCategories.component.scss']
})

export class ManageCategoriesComponent implements OnInit {
  categories: Category[] = [];
  currCat: Category = new Category("");

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
  }

  editCategory(cat: Category){
    this.currCat = cat;
  }

  deleteCat(cat: Category){
    this.currCat = new Category("");
    let index = this.categories.findIndex(currCat => currCat == cat);
    if (index > -1){
      this.categories.splice(index, 1);
    }

  }

  newCat(){
    let newCat = new Category("new Category");
    this.currCat = newCat;
    this.categories.push(newCat);
  }
}