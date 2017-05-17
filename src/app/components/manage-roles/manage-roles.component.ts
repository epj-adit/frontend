import { Component, OnInit } from '@angular/core';
import { User } from "../../data/user";
import { UserService } from "../../services/user.service";
import { RoleService } from "../../services/role.service";
import { Role } from "../../data/role";

@Component({
    selector: 'manage-roles',
    templateUrl: './manage-roles.component.html',
    styleUrls: ['./manage-roles.component.scss']
})

export class ManageRolesComponent implements OnInit{
    private users: User[];
    private currentUser: User;
    private roles: Role[];

    constructor(private userService: UserService,
                private roleService: RoleService){

    }

    ngOnInit(): void{
        this.userService.getUsers().subscribe(users=> this.users = users);
        this.roleService.getRoles().subscribe(roles=> this.roles = roles);
    }

    editUser(user:User):void{
        this.currentUser = user;
        console.log("Editing User ", user.username);
    }

    userRoleChange(role:Role):void{
        console.log(`USERROLE of ${this.currentUser.username} changed to ${role.name}`);
        this.currentUser.role = role;
    }
    userChanged($event, user:User):void{
        console.log(`${user.username} changed. EVENT: ${$event}`);
    }

}