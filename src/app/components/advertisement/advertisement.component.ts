import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from "rxjs/Observable";

import { AdvertisementService } from '../../services/advertisement.service';
import { CategoryService } from "../../services/category.service";
import { ValidatorService } from "../../utils/validator.service";
import { Advertisement } from '../../data/advertisement';
import { Tag } from '../../data/tag';
import { Category } from "../../data/category";
import { StatusMessageService } from "../../utils/status-message.service";

@Component({
    selector: 'adit-advertisement',
    templateUrl: './advertisement.component.html',
    styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  form: FormGroup;
  categories: Category[];
  tags: Tag[] = [];
  pricePattern = '[0-9]+(\\.[0-9][05])?';
  isSubmitted = false;
  taghelpDisplay = 'none';

  constructor(private advertisementService: AdvertisementService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private statusMessageService: StatusMessageService) {
    this.form = this.formBuilder.group({
      id: null,
      title: '',
      category: '',
      description: '',
      priceValue: "0.00",
      tagValue: ['', ValidatorService.validateTags.bind(null, this.tags)],
    });
  }


    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(res => this.categories = res);
        this.route.params
            .switchMap((params: Params) => {
                if (+params['id']) {
                    return this.advertisementService.getAdvertisement(+params['id']);
                } else {
                    return Observable.of(new Advertisement(null, "", 0, "", null, this.tags));
                }
            })
            .subscribe(advertisement => {
                this.tags = advertisement.tags;
                this.form = this.formBuilder.group({
                    id: advertisement.id,
                    title: advertisement.title,
                    category: advertisement.category ? advertisement.category.name : null,
                    description: advertisement.description,
                    priceValue: parseFloat(advertisement.price / 100 + "").toFixed(2),
                    tagValue: ['', ValidatorService.validateTags.bind(null, this.tags)],
                });
            });
    }


        onSubmit(value) {
    let cat = this.categories.find(cat => cat.name == value.category);
    let newAd = new Advertisement(
      value.id,
      value.title,
      Math.round(parseFloat(value.priceValue) * 100),
      value.description,
      cat,
      this.tags
    );
    this.advertisementService.createAdvertisementAndTags(newAd)
      .subscribe(ad => {
            this.router.navigate( ['/account', 'advertisements'] );
        },
        err => {
          this.statusMessageService.error("STATUS.errorOccurred", { details: err.detailMessage });
          console.error(err);
        });
  }

    addTag(): void {
        let pattern = new RegExp('[a-zA-Z\\-_\\d]+;');
        let value = this.form.controls['tagValue'].value;
        if (pattern.test(value)) {
            this.tags.push(new Tag(value.substring(0, value.length - 1)));
            this.form.controls['tagValue'].setValue('');
        }
    }

    removeTag(tag: Tag): void {
        let index = this.tags.indexOf(tag);
        let oldtag = this.tags[index];
        if (index > -1) {
            this.tags.splice(index, 1);
        }
        this.form.controls['tagValue'].setValue("");
    }

    changeDisplay(): void {
        this.taghelpDisplay = this.taghelpDisplay == 'inline-block' ? 'none' : 'inline-block';
    }
}
