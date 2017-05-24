import { Injectable } from "@angular/core";
import { ApiCallService } from "../utils/api-call.service";
import { Observable } from "rxjs";
import { Role } from "../data/role";

@Injectable()
export class RoleService{

    constructor(private apiCall: ApiCallService){

    }

    public getRoles(): Observable<Role[]>{
        let roles = this.apiCall.get("roles/").map(res=>{
            return res as Role[];
        })
            .catch(this.handleError);
        return roles;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}