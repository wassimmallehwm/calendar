import { Page } from '@shared/types';
import { BaseService } from '@shared/services/base.service';
import { Group } from '../models/Group';

class GroupsService extends BaseService {
    private SRC_URL = "groups/";

    private static instance: GroupsService;

    private groups: Group[] | undefined;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new GroupsService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    save(data: Group){
        return data._id ? this.update(data._id, data) : this.create(data)
    }

    async findAll(query?: any){
        if(this.groups)
            return this.groups
        else {
            this.groups = await (await this.httpClient<Group[]>(this.httpUrl(''), "GET", query)).data
            return this.groups
        }
    }

    list(query?: any){
        return this.httpClient<Page<Group>>(this.httpUrl('list'), "GET", query);
    }

    findOne(id: string){
        return this.httpClient<Group>(this.httpUrl(id), 'GET');
    }

    create(data: Group){
        return this.httpClient(this.httpUrl(""), 'POST', data);
    }

    update(id: string, data: Group){
        return this.httpClient(this.httpUrl(id), 'PUT', data);
    }

    delete(id: string){
        return this.httpClient(this.httpUrl(id), 'DELETE');
    }

}

export default GroupsService.getInstance();

