import { Role } from './role';
import { Subscription } from './subscription';

export class User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  passwordPlaintext:string;
  jwtToken: string;
  isPrivate: boolean;
  isActive: boolean;
  wantsNotification: boolean;
  created: string;
  updated: string;
  role: Role = null;
  constructor (username, email, password){
    this.username = username;
    this.email=email;
    this.passwordPlaintext=password;
    this.isPrivate=false;
    this.isActive=true;
    this.wantsNotification=false;
    this.role=new Role();
    this.role.id=3;
  }
}