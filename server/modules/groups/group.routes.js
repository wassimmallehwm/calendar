const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { create, getAll, list, getById, getByLabel, update, remove } = require('./group.controller');

router.post('/', authenticated, create);

router.get('/', getAll);

router.get('/list', list);

router.get('/:id', getById);

router.get('/label/:label', getByLabel);

router.put('/:id', update);

router.delete('/:id', remove);


module.exports = router;