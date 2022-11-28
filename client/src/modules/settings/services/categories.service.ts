import { Page } from '@shared/types';
import { BaseService } from '@shared/services/base.service';
import { Category } from '../models/Category';

class CategoriesService extends BaseService {
    private SRC_URL = "categories/";

    private static instance: CategoriesService;

    private categories: Category[] | undefined;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new CategoriesService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    save(data: Category){
        return data._id ? this.update(data._id, data) : this.create(data)
    }

    async findAll(query?: any){
        if(this.categories)
            return this.categories
        else {
            this.categories = await (await this.httpClient<Category[]>(this.httpUrl(''), "GET", query)).data
            return this.categories
        }
    }

    list(query?: any){
        return this.httpClient<Page<Category>>(this.httpUrl('list'), "GET", query);
    }

    findOne(id: string){
        return this.httpClient<Category>(this.httpUrl(id), 'GET');
    }

    create(data: Category){
        return this.httpClient(this.httpUrl(""), 'POST', data);
    }

    update(id: string, data: Category){
        return this.httpClient(this.httpUrl(id), 'PUT', data);
    }

    delete(id: string){
        return this.httpClient(this.httpUrl(id), 'DELETE');
    }

}

export default CategoriesService.getInstance();

