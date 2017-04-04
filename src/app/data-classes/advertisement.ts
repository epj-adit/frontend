import { AdvertisementState } from './advertisementState';
import { Tag } from './tag';
import { User } from './user';
import { Category } from './category';
import { Media } from './media';

export class Advertisement {
  id: number;
  title: string;
  price: number;
  description: string;
  advertisementState: AdvertisementState;
  created: Date;
  updated: Date;
  tags: Tag[] = [];
  advertiser: User = null;
  category: Category = null;
  media: Media[] = [];

  // TODO: add advertiser, created, updated
  constructor(id: number, title: string, price: number, description: string, category: Category, tags: Tag[], media?: Media[]) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.description = description;
      this.tags = tags;
      this.media = media;
      this.category = category;
      this.advertiser = null;
      this.created = new Date(Date.now());
      this.updated = new Date(Date.now());
  }
}