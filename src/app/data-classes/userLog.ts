import {User} from './user';

export class UserLog {
    id: number;
    ip: string;
    created: Date;
    action: string;
    user: User;
}