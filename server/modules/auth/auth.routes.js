const router = require('express').Router();
const { authenticated, refreshToken } = require('../../security/middlewares');
const { signup, login, refresh_token} = require('./auth.controller');

router.post('/login', login);

router.post('/signup', signup);

router.post('/refresh-token', refreshToken, refresh_token);

module.exports = router;