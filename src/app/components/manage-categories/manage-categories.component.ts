import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../data/category";
@Component({
  selector: 'adit-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})

export class ManageCategoriesComponent implements OnInit {
  categories: Category[] = [];
  currCat: Category = new Category("");
  isSubmitted = false;
  hasError = false;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
  }

  editCategory(cat: Category) {
    this.currCat = cat;
  }

  deleteCat(cat: Category) {
    this.currCat = new Category("");
    let index = this.categories.findIndex(currCat => currCat == cat);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
    // TODO: error handling anhand von statuscodes!
    this.categoryService.deleteCat(cat).subscribe(
      res => console.log("was deleted"),
      err => console.log("cant be deleted")
    );
  }

  newCat() {
    let newCat = new Category("new Category");
    this.currCat = newCat;
    this.categories.push(newCat);
  }

  onSubmit() {
    this.categoryService.createOrUpdate(this.categories)
      .subscribe(
        res => this.isSubmitted = true,
        err => this.hasError = true);
  }
}