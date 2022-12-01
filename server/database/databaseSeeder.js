const fs = require('fs');
const path = require('path');
const { CategoryService } = require('../modules/categories');

const { RoleService } = require("../modules/roles");
const { AppConfigService } = require('../modules/settings');
const { UserService } = require("../modules/users");

const createDefaultCategory = async () => {
    await CategoryService.create({
        label: "Default",
        backgroundColor: "#025174",
        textColor: "#ffffff"
    })
}


const createCollections = async () => {
    const { success, content } = await RoleService.create('ADMIN');
    await RoleService.create('USER');

    if (success) {
        const admin = {
            email: "admin@admin.com",
            firstname: "Admin",
            lastname: "Admin",
            role: content._id,
            password: "password"
        }
        await UserService.create(admin)
    }
    await createDefaultCategory()
}

const initializeApp = async () => {
    const {
        success
    } = await AppConfigService.create();
    if (success) {
        await createCollections();
    }
}


const migrate = async (version) => {
    const migrations = path.join(__dirname, 'migrations');
    if (fs.existsSync(`${migrations}/${version}.js`)) {
        require(`${migrations}/${version}.js`)
    }
}

const dbSeeder = async () => {
    AppConfigService.find().then(
        async res => {
            if (res.success) {
                console.log('App already initialized !')
                migrate(res.content.version)
                return;
            } else {
                console.log('Initializing App ...')
                await initializeApp();
                console.log('App initialized successfully !')
            }
        },
        error => {
            console.log(error);
        }
    )
}


module.exports = dbSeeder;