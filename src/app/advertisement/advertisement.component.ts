import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from "rxjs/Observable";

import { AdvertisementService } from '../_services/advertisement.service';
import { CategoryService } from "../_services/category.service";
import { Advertisement } from '../data-classes/advertisement';
import { Tag } from '../data-classes/tag';
import { Category } from "../data-classes/category";

@Component({
  selector: 'adit-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  form: FormGroup;
  categories: Category[];
  tags: Tag[] = [];
  pricePattern = '[0-9]+(.[0-9][05])?';
  isSubmitted = false;
  taghelpDisplay = 'none';

  constructor(private advertisementService: AdvertisementService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: null,
      title: '',
      category: '',
      description: '',
      priceValue: "0.00",
      tagValue: ['', this.validateTags.bind(this)],
    });
  }

  validateTags(c: FormControl) {
    return this.tags.length > 0 ? null : {
      validateTags: {
        valid: false
      }
    }
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
        this.form = this.formBuilder.group({
          id: advertisement.id,
          title: advertisement.title,
          category: advertisement.category ? advertisement.category.name : null,
          description: advertisement.description,
          priceValue: parseFloat(advertisement.price / 100 + "").toFixed(2),
          tagValue: ['', this.validateTags.bind(this)],
        });
        this.tags = advertisement.tags;
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
      .subscribe(ad => this.isSubmitted = true);
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
    this.form.controls.tagValue.setValue("");
  }

  changeDisplay(): void {
    this.taghelpDisplay = this.taghelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }
}
