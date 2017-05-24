import { MessageState } from './message-state';
import { Advertisement } from './advertisement';
import { User } from './user';

export class Message {
  id: number;
  text: string;
  created: Date;
  messageState: MessageState;
  advertisement: Advertisement;
  sender: User;
  recipient: User;
}