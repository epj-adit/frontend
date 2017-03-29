import {MessageState} from './messageState';
import {Advertisement} from './advertisement';
import {User} from './user';

export class Message {
    id: number;
    text: string;
    created: Date;
    messageState: MessageState;
    advertisement: Advertisement;
    sender: User;
    recipient: User;
}