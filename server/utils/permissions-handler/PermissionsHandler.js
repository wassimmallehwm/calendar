class PermissionsHandler {
    instance;

    constructor() {
    }

    static createInstance() {
        return new PermissionsHandler()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    isAdmin = (user) => {
        return user && user.role && user.role.label == 'ADMIN';
    }

}

module.exports = PermissionsHandler.getInstance();