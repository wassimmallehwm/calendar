const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { create, getAll, getByRange, getById, getPaginated, update, remove} = require('./event.controller');

router.post('/', authenticated, create);

router.get('/', authenticated, getAll);

router.get('/by-range', authenticated, getByRange);

router.get('/list', authenticated, getPaginated);

router.get('/:id', authenticated, getById);

router.put('/:id', authenticated, update);

router.delete('/:id', authenticated, remove);

module.exports = router;