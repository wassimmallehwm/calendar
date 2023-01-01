const router = require('express').Router();
const { authenticated, admin } = require('../../security/middlewares');
const { FilesHandler } = require('../../utils');
const { find, update, uploadLogo, logo, generateBackup } = require('./app-config.controller');

router.get('/', find);

router.put('/', update);

router.get('/logo', logo);

router.put(
    '/logo',
    authenticated,
    admin,
    FilesHandler.upload('images').single('logo'),
    uploadLogo
);

router.post(
    '/backup',
    authenticated,
    admin,
    generateBackup
)

module.exports = router;