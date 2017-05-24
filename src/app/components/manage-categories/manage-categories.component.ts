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
  currCatActive = false;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
  }

  editCategory(cat: Category) {
    this.currCat = cat;
    this.currCatActive = true;
    this.isSubmitted = false;
  }

  deleteCat(cat: Category) {
    this.isSubmitted = false;
    let index = this.categories.findIndex(currCat => currCat == cat);
    if (index > -1) {
      if (cat.id){
        this.categoryService.deleteCat(cat).subscribe(
          res => {
            this.currCat = new Category("");
            this.currCatActive = false;
            console.log("was deleted");
            this.categories.splice(index, 1);
          },
          // TODO: error handling anhand von statuscodes!
          err => console.log("cant be deleted")
        );
      } else {
        this.categories.splice(index, 1);
        this.currCat = new Category("");
        this.currCatActive = false;
      }
    }
  }

  newCat() {
    this.isSubmitted = false;
    let newCat = new Category("new Category");
    this.currCat = newCat;
    this.currCatActive = true;
    this.categories.push(newCat);
  }

  onSubmit() {
    this.categoryService.createOrUpdate(this.categories)
      .subscribe(
        res => {
          this.isSubmitted = true;
          this.categories = res;
          this.currCat = new Category("");
          this.currCatActive = false;
        },
        err => this.hasError = true);
  }
}