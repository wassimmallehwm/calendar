export class Config {
    static prod = {
        apiUrl: "/api/",
        publicUrl: "/public/"
    };

    static dev = {
        apiUrl: "http://localhost:5000/api/",
        publicUrl: "http://localhost:5000/public/"
        // apiUrl: "http://192.168.1.13:5000/api/",
        // publicUrl: "http://192.168.1.13:5000/public/"
    };

    public static getConfig(){
        return process.env.NODE_ENV === 'development' ? this.dev : this.prod
    }
}
