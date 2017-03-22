import {Role} from './role';
import {Subscription} from './subscription';

export class User {
    username: string;
    email: string;
    passwordhash: string;
    jwtToken: string;
    isPrivate: boolean;
    isActive: boolean;
    wantsNotifications: boolean;
    created: Date;
    updated: Date;
    role: Role;
    subscriptions: Subscription[];
}