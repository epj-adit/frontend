import { Role } from './role';
import { Subscription } from './subscription';

export class User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  password:string;
  jwtToken: string;
  isPrivate: boolean;
  isActive: boolean;
  wantsNotification: boolean;
  created: string;
  updated: string;
  role: Role = null;
  subscriptions: Subscription[] = [];
  constructor (username, email, password){
    this.username = username;
    this.email=email;
    this.password=password;
    this.isPrivate=false;
    this.isActive=true;
    this.wantsNotification=false;
  }
}