import { BaseService } from '@shared/services/base.service';
import { Role } from '../models/Role';

class RolesService extends BaseService {
    private SRC_URL = "roles/";

    private static instance: RolesService;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new RolesService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    findAll(query?: any){
        return this.httpClient(this.httpUrl(''), "GET", query);
    }

    findOne(id: string){
        return this.httpClient(this.httpUrl(id), 'GET');
    }

    create(data: Role){
        return this.httpClient(this.httpUrl(""), 'POST', data);
    }

    update(id: string, data: Role){
        return this.httpClient(this.httpUrl(id), 'PUT', data);
    }

}

export default RolesService.getInstance();

