const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { create, getAll, getById, getPaginated, update, remove} = require('./event.controller');

router.post('/', authenticated, create);

router.get('/', getAll);

router.get('/list', getPaginated);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;