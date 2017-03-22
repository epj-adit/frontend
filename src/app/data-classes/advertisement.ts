import {AdvertisementState} from './advertisementState';
import {Tag} from './tag';
import {User} from './user';
import {Category} from './category';

export class Advertisement {
    title: String;
    price: number;
    description: String;
    advertisementState: AdvertisementState;
    created: Date;
    updated: Date;
    tags: Tag[];
    advertiser: User;
    category: Category;
}