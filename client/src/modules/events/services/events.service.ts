import { BaseService } from '../../../shared/services/base.service';
import { Event } from "../models/event.model";

export class EventsService extends BaseService {
    SRC_URL = "events/";

    constructor() {
        super();
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }
    
    createOrUpdate(data: Event){
        const method = data.id === '' ? "POST" : "PUT"
        const url = data.id === '' ? '' : data.id
        return this.httpClient(this.httpUrl(url), method, data);
    }

    findAll(query?: any){
        return this.httpClient(this.httpUrl(''), 'GET', query);
    }

    findByRange(start: Date, end: Date, query?: any){
        return this.httpClient<Event[]>(this.httpUrl('by-range'), 'GET', {
            start,
            end,
            ...query
        });
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

