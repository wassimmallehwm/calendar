const multer = require('multer')
const fs = require('fs')
const exec = require('child_process').exec;

class FilesHandler {
    instance;

    constructor() {
    }

    static createInstance() {
        return new FilesHandler()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }


    createDir = (directory, callback) => {
        if (!fs.existsSync(directory)) {
            console.log(`${directory} does not exist`)
            exec(`mkdir ${directory}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(error)
                }
                callback()
            });
        }
    }

    upload = (path) => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/' + path);
            },
            filename: (req, file, cb) => {
                const name = Date.now() + '-' + file.originalname
                cb(null, name);
                req.file = name
            }
        });

        return multer({ storage });
    }

    delete = (resourceType, resourceId, filename) => {
        const filePath = `public/${resourceType}/${resourceId}/${filename}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

}

module.exports = FilesHandler.getInstance();