import { Component, OnInit } from "@angular/core";

import { CategoryService } from "../../services/category.service";
import { Category } from "../../data/category";
import { StatusMessageService } from "../../utils/status-message.service";

@Component({
  selector: 'adit-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})

export class ManageCategoriesComponent implements OnInit {
  categories: Category[] = [];
  currCat: Category = new Category("");

  constructor(private categoryService: CategoryService, private statusMessageService: StatusMessageService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
  }

  editCategory(cat: Category) {
    this.currCat = cat;
  }

  deleteCat(cat: Category) {
    let index = this.categories.findIndex(currCat => currCat == cat);
    if (index > -1) {
      if (cat.id){
        this.categoryService.deleteCat(cat).subscribe(
          () => {
            this.currCat = new Category("");
            this.categories.splice(index, 1);
          },
          err => {
            switch(err.status) {
              case 409:
                this.statusMessageService.error("MANAGECATEGORIES.deleteConstraintError");
                break;

              default:
                this.statusMessageService.error("STATUS.errorOccurred", { details: err.detail });
                break;
            }
            console.error(err);
          }
        );
      } else {
        this.categories.splice(index, 1);
        this.currCat = new Category("");
      }
    }
  }

  newCat() {
    let newCat = new Category("new Category");
    this.currCat = newCat;
    this.categories.push(newCat);
  }

  onSubmit() {
    this.categoryService.createOrUpdate(this.categories)
      .subscribe(
        res => {
          this.statusMessageService.success("MANAGECATEGORIES.successMessage");
          this.categories = res;
        },
        err => {
          this.statusMessageService.error("STATUS.errorOccurred", { details: err.detail });
          console.error(err);
        });
  }
}
