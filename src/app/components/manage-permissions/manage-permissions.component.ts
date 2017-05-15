import { Component, OnInit } from '@angular/core';
import { Role } from "../../data/role";
import { RoleService } from "../../services/role.service";

@Component({
    selector: 'manage-permissions',
    templateUrl: './manage-permissions.component.html',
    styleUrls: ['./manage-permissions.component.scss']
})

export class ManagePermissionsComponent implements OnInit{
    private roles: Role[];

    constructor(private roleService: RoleService){

    }

    ngOnInit(): void{
        this.roleService.getRoles().subscribe(res=>this.roles = res);
    }
}