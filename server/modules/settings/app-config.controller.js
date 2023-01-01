const { createBackup } = require("../../database/backup");
const { ErrorsHandler } = require("../../utils");
const AppConfigService = require("./app-config.service");
const ENTITY = "App Config"

module.exports.find = async (req, res) => {
    try {
        const {
            success,
            status,
            content,
            message
        } = await AppConfigService.find();
        res.status(status).json(success ? content : { message });
    } catch (err) {
        const { status, message } = ErrorsHandler.handle(err, "AppConfigController:find")
        res.status(status).json({ message, entity: ENTITY })
    }
};

module.exports.update = async (req, res) => {
    try {
        const {
            success,
            status,
            content,
            message
        } = await AppConfigService.update(req.body);
        res.status(status).json(success ? content : { message });
    } catch (err) {
        console.log(err)
        const { status, message } = ErrorsHandler.handle(err, "AppConfigController:update")
        res.status(status).json({ message, entity: ENTITY })
    }
};

module.exports.uploadLogo = async (req, res) => {
    try {
        const {
            success,
            status,
            content,
            message
        } = await AppConfigService.updateLogo(req.file.filename);
        res.status(status).json(success ? content : { message });
    } catch (err) {
        console.log(err)
        const { status, message } = ErrorsHandler.handle(err, "AppConfigController:updateLogo")
        res.status(status).json({ message, entity: ENTITY })
    }
};


module.exports.logo = async (req, res) => {
    try {
        const {
            status,
            content
        } = await AppConfigService.getLogo();
        res.status(status).sendFile(content);
    } catch (err) {
        const { status, message } = ErrorsHandler.handle(err, "AppConfigController:logo")
        res.status(status).json({ message, entity: ENTITY })
    }
}

module.exports.generateBackup = async (req, res) => {
    try{
        const result = await createBackup()
        res.download(result)
        //res.send(result);
    } catch (err) {
        const { status, message } = ErrorsHandler.handle(err, "AppConfigController:generateBackup")
        res.status(status).json({ message, entity: ENTITY })
    }
}
