import { Component, OnInit } from '@angular/core';
import { User } from "../../data/user";
import { UserService } from "../../services/user.service";
import { RoleService } from "../../services/role.service";
import { Role } from "../../data/role";
import { StatusMessageService } from "../../utils/status-message.service";

@Component({
    selector: 'adit-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})

export class AdminPanelComponent implements OnInit {
    private users: User[];
    private currentUser: User;
    private editedUsers: {[userId:number]:boolean;} = {};
    private roles: Role[];


    constructor(private userService: UserService,
        private roleService: RoleService,
        private statusMessageService: StatusMessageService){
    }

    ngOnInit(): void{
        this.userService.getUsers().subscribe(users=> {
            this.users = users;
            this.users.forEach(u=>this.editedUsers[u.id] = false);
        });
        this.roleService.getRoles().subscribe(roles=> this.roles = roles);
    }

    editUser(user:User):void {
        this.currentUser = user;
    }

    userRoleChanged(roleName: string, user: User):void {
        this.currentUser = user;
        this.currentUser.role = this.roles.filter(r=>r.name===roleName).pop();
        this.editedUsers[this.currentUser.id] = true;
    }

    isActiveChanged(user:User): void{
        this.currentUser = user;
        this.currentUser.isActive = !this.currentUser.isActive;
        this.editedUsers[this.currentUser.id] = true;
    }

    onSubmit():void{
        this.userService.update(this.currentUser).subscribe(res=>
            {
                this.statusMessageService.success("USERROLES.success",null, 4000);
            }, err=>{
                this.statusMessageService.error("USERROLES.error", null, 6000);
            });
        this.editedUsers[this.currentUser.id] = false;
    }
}