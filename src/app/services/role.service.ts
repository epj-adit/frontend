import { Injectable } from "@angular/core";
import { ApiCallService } from "../utils/api-call.service";
import { Observable } from "rxjs";
import { Role } from "../data/role";

@Injectable()
export class RoleService{

    constructor(private apiCall: ApiCallService){

    }

    getRoles(): Observable<Role[]>{
        return this.apiCall.get("roles/").map(res=>res as Role[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}