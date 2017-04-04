import { Role } from './role';
import { Subscription } from './subscription';

export class User {
  id: number;
  username: string;
  email: string;
  passwordhash: string;
  jwtToken: string;
  isPrivate: boolean;
  isActive: boolean;
  wantsNotification: boolean;
  created: Date = new Date(Date.now());
  updated: Date = new Date(Date.now());
  role: Role = null;
  subscriptions: Subscription[] = [];
}