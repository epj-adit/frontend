import { Component, Input } from '@angular/core';

import { AdvertisementService } from '../_services/advertisement.service';
import { Advertisement } from "../data-classes/advertisement";
import { Category } from "../data-classes/category";
import { Tag } from "../data-classes/tag";

@Component({
  selector: 'adit-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers: [AdvertisementService]
})
export class AdvertisementComponent {
  // TODO:read av. categories from DB
  category = ['Bücher', 'WG-Zimmer', 'Jobs'];
  tags: Tag[] = [];
  tagValue: string = '';

  model = new Advertisement(1, "", null, "", null, this.tags);

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  addTag(): void{
    this.tags.push(new Tag(this.tagValue));
    this.tagValue = '';
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}