import {Category} from './category';
import {User} from './user';

export class Subscription {
    interval: number;
    lastUpdated: Date;
    category: Category;
    user: User;
}