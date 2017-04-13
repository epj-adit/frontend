import { Component, OnInit } from '@angular/core';

import { AdvertisementService } from '../_services/advertisement.service';
import { Advertisement } from '../data-classes/advertisement';
import { Tag } from '../data-classes/tag';
import { CategoryService } from "../_services/category.service";
import { Category } from "../data-classes/category";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'adit-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  constructor(private advertisementService: AdvertisementService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,) {
  }

  // TODO:read available categories from DB
  categories: Category[];
  tags: Tag[] = [];
  tagValue: string = '';
  pricePattern = '[0-9]+(.[0-9][05])?';
  priceValue = "0.00";
  isSubmitted = false;
  submitted = false;
  taghelpDisplay = 'none';

  model = new Advertisement(1, "", null, "", null, this.tags);

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
    if (this.route.params) {
      if (this.advertisementService.currentAdvertisement) {
        let currAd = this.advertisementService.currentAdvertisement;
        this.model = currAd;
        this.tags = currAd.tags;
        this.tagValue = " ";
        this.priceValue = currAd.price/100+"";
      } else {
        this.route.params
          .switchMap((params: Params) => this.advertisementService.getAdvertisement(+params['id']))
          .subscribe(advertisement => {
            this.model = advertisement;
            this.tags = advertisement.tags;
            this.tagValue = " ";
            this.priceValue = advertisement.price/100+"";
          });
      }
    } else {
      //TODO: bit of a hack -> find a way to validate without needing to set input to ' '
      this.tagValue = " ";
    }
  }


  onSubmit() {
    this.submitted = true;
    // convert userinput to Rappen
    this.model.price = parseFloat(this.priceValue) * 100;
    this.advertisementService.createAdvertisementAndTags(this.model)
      .subscribe(ad => {
        console.log(ad); //TODO: remove console.log for production
        this.isSubmitted = true;
      });
  }

  addTag(): void {
    let pattern = new RegExp('[a-zA-Z\\-_\\d]+;');
    if (pattern.test(this.tagValue)) {
      this.tags.push(new Tag(this.tagValue.substring(1, this.tagValue.length - 1)));
      this.tagValue = '';
    }
  }

  removeTag(tag: Tag): void {
    let index = this.tags.indexOf(tag);
    let oldtag = this.tags[index];
    if (index > -1) {
      this.tags.splice(index, 1);
    }
    this.tagValue = oldtag.name;
  }

  changeDisplay(): void {
    this.taghelpDisplay = this.taghelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }
}