import { Method } from "axios";
import { BaseService } from '@shared/services/base.service';

export class UsersService extends BaseService {
    SRC_URL = "users/";

    constructor() {
        super();
    }

    private http(apiUrl: string, method: Method, body?: any, headers?: any) {
        return this.httpClient(`${this.SRC_URL}${apiUrl}`, method, body, headers)
    }

    authenticate(data: any){
        return this.http('login', 'POST', data);
    }

    findAll(query: any){
        return this.http('findall', 'POST', query);
    }

    list(query: any){
        return this.http('list', 'GET', query);
    }

    findOne(id: string){
        return this.http(id, 'GET');
    }

    removeUser(id: string){
        return this.http(id, 'DELETE');
    }
    
    addOrUpdateUser(mode: string, data: any){
        const method = mode == "add" ? "POST" : "PUT"
        const url = mode == "add" ? "" : data._id
        return this.http(url, method, data);
    }

    search(q: string, role: string = ""){
        const url = `search?role=${role.toUpperCase()}&q=${q}`
        return this.http(url, 'GET');
    }


    //ROLES list

    findRoles(){
        return this.httpClient(`roles`, "GET")
    }
}

