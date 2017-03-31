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
  category = ['Bücher', 'WG-Zimmer', 'Jobs'];
  tags: Tag[] = [];

  model = new Advertisement(1, "My Ad", 1, "My Description", new Category(this.category[0]), this.tags);

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  addTag(tag: string){
    this.tags.push(new Tag(tag));
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}