const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { APP_NAME, ROOT_DIR } = require('../config');
const { FilesHandler } = require('../utils');
// const cron = require('node-cron');
// let runBackup = true;
const rootDir = ROOT_DIR.split('config')[0].slice(0, -1)

const createBackup = async () => {
    const cmd = `mongodump --host localhost --port 27017 --db ${APP_NAME} --out ${rootDir}`
    try {
        await exec(cmd);
        const dataPath = path.join(rootDir, APP_NAME)
        console.log("Database backup generated")
        const result = await FilesHandler.zipFolder(dataPath)
        return result
    } catch (e) {
        //runBackup = false;
        console.error(e);
    }

}
const restoreBackup = async () => {
    const cmd = `mongorestore --host localhost --port 27017 --db ${APP_NAME} ${rootDir}`
    try {
        await exec(cmd);
        const dataPath = path.join(rootDir, APP_NAME)
        console.log("Backup restored")
    } catch (e) {
        console.error(e);
    }
}

module.exports = { createBackup, restoreBackup };