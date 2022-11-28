import { AuthResponse, Settings } from "@shared/types";

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

    setUserData(userData: AuthResponse){
        localStorage.setItem(this._USER_DATA, JSON.stringify(userData))
    }

    getUserData(): AuthResponse{
        return JSON.parse(localStorage.getItem(this._USER_DATA) || '')
    }

    clearUserData(){
        localStorage.removeItem(this._USER_DATA)
    }

    setSettings(userData: Settings){
        localStorage.setItem(this._SETTINGS, JSON.stringify(userData))
    }

    getSettings(): Settings{
        return JSON.parse(localStorage.getItem(this._SETTINGS) || '')
    }

    clearSettings(){
        localStorage.removeItem(this._SETTINGS)
    }


}

export default StorageService.getInstance();

