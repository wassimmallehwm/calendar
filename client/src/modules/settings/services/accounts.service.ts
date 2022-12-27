import { BaseService } from '@shared/services/base.service';
import { Account } from '../models/Account';

class AccountsService extends BaseService {
    private SRC_URL = "users/";

    private static instance: AccountsService;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new AccountsService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    list(query?: any){
        return this.httpClient(this.httpUrl('list'), "GET", query);
    }

    findInGroup(groupId: string, query?: any){
        return this.httpClient(this.httpUrl(`in-group/${groupId}`), "GET", query);
    }

    findOutGroup(groupId: string, query?: any){
        return this.httpClient(this.httpUrl(`out-group/${groupId}`), "GET", query);
    }

    findOne(id: string){
        return this.httpClient(this.httpUrl(id), 'GET');
    }

    create(data: Account){
        return this.httpClient(this.httpUrl(""), 'POST', data);
    }

    update(id: string, data: Account){
        return this.httpClient(this.httpUrl(id), 'PUT', data);
    }

    delete(id: string){
        return this.httpClient(this.httpUrl(id), 'DELETE');
    }

}

export default AccountsService.getInstance();

