import {Category} from './category';
import {User} from './user';

export class subscription {
    interval: number;
    lastUpdated: Date;
    category: Category;
    user: User;
}