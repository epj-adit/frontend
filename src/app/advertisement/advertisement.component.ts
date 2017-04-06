import { Component } from '@angular/core';

import { AdvertisementService } from '../_services/advertisement.service';
import { Advertisement } from "../data-classes/advertisement";
import { Tag } from "../data-classes/tag";

@Component({
  selector: 'adit-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent {
  constructor(private advertisementService: AdvertisementService) {
  }

  // TODO:read available categories from DB
  category = ['Bücher', 'WG-Zimmer', 'Jobs'];
  tags: Tag[] = [];
  tagValue: string = '';
  pricePattern = '[0-9]+(.[0-9]{2})?';
  isSubmitted = '';

  model = new Advertisement(1, "", null, "", null, this.tags);

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.advertisementService.create(this.model)
      .then(ad => this.isSubmitted = "Your ad '"+ad.title + "' has been submitted");
  }

  addTag(): void{
    let pattern = new RegExp('[a-zA-Z\\-_\d]+;');
    if (pattern.test(this.tagValue)){
      this.tags.push(new Tag(this.tagValue.substring(0,this.tagValue.length-1)));
      this.tagValue = '';
    }
  }
}