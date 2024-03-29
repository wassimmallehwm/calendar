const multer = require('multer')
const fs = require('fs')
const os = require('os');
const exec = require('child_process').exec;
const { zip } = require('zip-a-folder');
const path = require('path');
const { ROOT_DIR } = require('../../config');

class FilesHandler {
    instance;
    rootDir = ROOT_DIR.split('config')[0].slice(0, -1)

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
        let cmd = ''
        let directoryPath = ''
        if (os.platform() == 'win32') {
            directoryPath = directory.join('\\')
            cmd = `md ${directory.join('\\')}`
        } else {
            directoryPath = directory.join('/')
            cmd = `mkdir ${directory.join('/')}`
        }
        if (!fs.existsSync(directoryPath)) {
            console.log(`${directoryPath} does not exist`)
            exec(cmd, (error, stdout, stderr) => {
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

    zipFolder = async (folderPath, folderName) => {
        try{
            const zipPath = path.join(this.rootDir, 'public', `${folderName}.zip`)
            
            await zip(folderPath, zipPath)
            return `${folderName}.zip`
        } catch(error){
            console.error(error)
        }
    }

}

module.exports = FilesHandler.getInstance();