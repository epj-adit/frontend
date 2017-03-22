import {User} from './user';

export class UserLog {
    ip: string;
    created: Date;
    action: string;
    user: User;
}