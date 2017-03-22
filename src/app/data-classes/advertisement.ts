import {Status} from './status';
import {Tag} from './tag';
import {User} from './user';
import {Category} from './category';

export class Advertisement {
    title: String;
    price: number;
    description: String;
    status: Status;
    created: Date;
    updated: Date;
    tags: Tag[];
    advertiser: User;
    category: Category;
}