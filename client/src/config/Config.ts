export class Config {
    static prod = {
        apiUrl: "/api/",
        publicUrl: "/public/"
    };

    static dev = {
        apiUrl: "http://localhost:4000/api/",
        publicUrl: "http://localhost:4000/public/"
        // apiUrl: "http://192.168.1.13:4000/api/",
        // publicUrl: "http://192.168.1.13:4000/public/"
    };

    public static getConfig(){
        return process.env.NODE_ENV === 'development' ? this.dev : this.prod
    }
}
