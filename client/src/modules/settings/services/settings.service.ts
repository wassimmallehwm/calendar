import { Settings } from 'src/shared/types';
import { BaseService } from '@shared/services/base.service';

class SettingsService extends BaseService {
    private SRC_URL = "settings/";

    private static instance: SettingsService;

    constructor() {
        super();
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new SettingsService()
        }
        return this.instance
    }

    private httpUrl = (apiUrl: string) => {
        return `${this.SRC_URL}${apiUrl}`
    }

    find(){
        return this.httpClient<Settings>(this.httpUrl(''), "GET");
    }

    update(data: Settings){
        return this.httpClient(this.httpUrl(''), 'PUT', data);
    }

    updateLogo(data: FormData){
        return this.httpClient<Settings>(this.httpUrl('logo'), 'PUT', data);
    }

}

export default SettingsService.getInstance();

