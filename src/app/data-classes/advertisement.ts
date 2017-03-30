import { AdvertisementState } from './advertisementState';
import { Tag } from './tag';
import { User } from './user';
import { Category } from './category';
import { Media } from './media';

export class Advertisement {
  id: number;
  title: String;
  price: number;
  description: String;
  advertisementState: AdvertisementState;
  created: Date;
  updated: Date;
  tags: Tag[];
  advertiser: User;
  category: Category;
  media: Media[]
}