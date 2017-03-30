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
  created: Date;
  updated: Date;
  role: Role;
  subscriptions: Subscription[];
}