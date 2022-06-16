import { Method } from "axios";
import { BaseService } from '../../../shared/services/base.service';

export class EventsService extends BaseService {
    SRC_URL = "events/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    create(data: any){
        return this.httpClient(this.httpUrl(''), "POST", data);
    }

    findAll(query?: any){
        return this.httpClient(this.httpUrl(''), 'GET', query);
    }

    list(query?: any){
        return this.httpClient(this.httpUrl('list'), 'GET', query);
    }

    findOne(id: string){
        return this.httpClient(this.httpUrl(id), 'GET');
    }

    remove(id: string){
        return this.httpClient(this.httpUrl(id), 'DELETE');
    }
}

