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
    private currentUserDirty: boolean = false;
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

    userRoleChanged(roleName: string, user: User):void {
        this.currentUser = user;
        this.currentUser.role = this.roles.filter(r=>r.name===roleName).pop();
        this.currentUserDirty = true;
    }

    onSubmit():void{
        console.log("Sending put request with user ", this.currentUser.username);
        console.log(`${this.currentUser.role.name}`);
        this.userService.update(this.currentUser).subscribe(res=>
        {
            console.log("Success");
        },err=>{
            console.log("ERROR:",err);
        });
        this.currentUserDirty = false;
    }
}