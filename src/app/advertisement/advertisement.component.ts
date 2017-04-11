import { Component } from '@angular/core';

import { AdvertisementService } from '../_services/advertisement.service';
import { Advertisement } from '../data-classes/advertisement';
import { Tag } from '../data-classes/tag';

@Component({
  selector: 'adit-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent /* implements AfterViewInit*/ {
  constructor(private advertisementService: AdvertisementService) {
  }

  // TODO:read available categories from DB
  category = ['Bücher', 'WG-Zimmer', 'Jobs'];
  tags: Tag[] = [];
  tagValue: string = '';
  pricePattern = '[0-9]+(.[0-9][05])?';
  isSubmitted = '';
  hasNoTags = true;
  submitted = false;
  taghelpDisplay = 'none';

  model = new Advertisement(1, "", null, "", null, this.tags);

  onSubmit() {
    this.submitted = true;
    // convert userinput to Rappen
    // parseFloat needs a string as input. this.model.price should be a number, but is a string (userinput)
    this.model.price = parseFloat(this.model.price + "") * 100;
    this.advertisementService.create(this.model)
      .then(ad => this.isSubmitted = "Your ad '" + ad.title + "' has been submitted");
  }

  addTag(): void {
    let pattern = new RegExp('[a-zA-Z\\-_\d]+;');
    if (pattern.test(this.tagValue)) {
      this.tags.push(new Tag(this.tagValue.substring(0, this.tagValue.length - 1)));
      this.tagValue = '';
      this.hasNoTags = false;
    }
  }

  removeTag(tag: Tag): void {
    let index = this.tags.indexOf(tag);
    let oldtag = this.tags[index];
    if (index > -1) {
      this.tags.splice(index, 1);
    }
    this.hasNoTags = true;
    this.tagValue = oldtag.name;
  }

  changeDisplay():void {
    this.taghelpDisplay = this.taghelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }
}