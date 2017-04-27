import { Role } from './role';
import { Subscription } from './subscription';

export class User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  //jwtToken: string;
  isPrivate: boolean;
  isActive: boolean;
  wantsNotification: boolean;
  created: string;
  //updated: Date = new Date(Date.now());
  role: Role = null;
  subscriptions: Subscription[] = [];
}