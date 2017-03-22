import {MessageState} from './messageState';
import {Advertisement} from './advertisement';
import {User} from './user';

export class Message {
    text: string;
    created: Date;
    status: MessageState;
    advertisement: Advertisement;
    sender: User;
    recipient: User;
}