import { Account } from "@modules/settings/models/Account";
import { Settings } from "@shared/types";

class StorageService {
    private _SETTINGS = "settings";
    private _USER_DATA = "userData";

    private static instance: StorageService;

    constructor() {
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new StorageService()
        }
        return this.instance
    }

    setUserData(userData: Account){
        localStorage.setItem(this._USER_DATA, JSON.stringify(userData))
    }

    getUserData(): Account | null{
        const data = localStorage.getItem(this._USER_DATA)
        if(data){
            return JSON.parse(data)
        }
        return null
    }

    clearUserData(){
        localStorage.removeItem(this._USER_DATA)
    }

    setSettings(userData: Settings){
        localStorage.setItem(this._SETTINGS, JSON.stringify(userData))
    }

    getSettings(): Settings | null{
        const data = localStorage.getItem(this._SETTINGS)
        if(data){
            return JSON.parse(data)
        }
        return null
    }

    clearSettings(){
        localStorage.removeItem(this._SETTINGS)
    }


}

export default StorageService.getInstance();

