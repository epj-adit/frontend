import {Role} from './role';

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
}