const AppConfig = require("./app-config.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");
const path = require('path');
const { APP_NAME } = require("../../config");

class AppConfigService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new AppConfigService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    create = async () => {
        try {
            const appconfig = new AppConfig();
            appconfig.name = APP_NAME;
            appconfig.version = '1.0.0';
            appconfig.social_name = APP_NAME;
            appconfig.logo = 'logo.png';
            appconfig.icon = 'icon.png';
            const result = await appconfig.save();
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:create"))
        }
    }

    find = async () => {
        try {
            const result = await AppConfig.findOne()
                .select('-_id')
                .sort("-created_at")
                .exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `AppConfig not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:find"))
        }
    }

    update = async (data) => {
        try {
            let result = await AppConfig.findOne().sort("-created_at").exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `AppConfig data not found !`
                })
            }
            result = await AppConfig.findOneAndUpdate({ _id: result._id }, data, { new: true });
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:update"))
        }
    }

    updateVersion = async (version) => {
        try {
            let result = await AppConfig.findOne().sort("-created_at").exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `AppConfig data not found !`
                })
            }
            result = await AppConfig.findOneAndUpdate({ _id: result._id }, {version}, { new: true });
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:updateVersion"))
        }
    }

    updateLogo = async (logo) => {
        try {
            let result = await AppConfig.findOne().sort("-created_at").exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `AppConfig data not found !`
                })
            }
            result.logo = logo;
            await result.save();
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:updateLogo"))
        }
    }

    getLogo = async () => {
        try {
            const config = await AppConfig.findOne()
                .select('-_id')
                .sort("-created_at")
                .exec();
            let result = path.resolve(`public/images/${config.logo}`)
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AppConfigService:getLogo"))
        }
    }
}

module.exports = AppConfigService.getInstance()
