const { ErrorsHandler } = require("../../utils");
const CategoryService = require("./category.service");
      
module.exports.create = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await CategoryService.create(req.body)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "CategoryController:create")
    res.status(status).json({ message, entity: 'Category' })
  }
};

module.exports.getAll = async(req, res) => {
  try {
    const query = req.query || {};
    const {
      success,
      status,
      content,
      message
    } = await CategoryService.findAll(query)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "CategoryController:getAll")
    res.status(status).json({ message, entity: 'Category' })
  }
};

module.exports.list = async(req, res) => {
  try {
    const { page = 1, limit = 10, sortField = "_id", sortOrder = 1, search } = req.query;
    const {
      success,
      status,
      content,
      message
    } = await CategoryService.findAllPaginated({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sortField,
      sortOrder,
      search
    })
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "CategoryController:list")
    res.status(status).json({ message, entity: 'Category' })
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const {
      success,
      status,
      content,
      message
    } = await CategoryService.findById(id)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "CategoryController:getById")
    res.status(status).json({ message, entity: 'Category' })
  }
};

module.exports.getByLabel = async(req, res) => {
  try {
    const { label } = req.params;
    const {
      success,
      status,
      content,
      message
    } = await CategoryService.findByLabel(label)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "CategoryController:getByLabel")
    res.status(status).json({ message, entity: 'Category' })
  }
};

module.exports.update = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await CategoryService.update(req.params.id, req.body)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "CategoryController:update")
    res.status(status).json({ message, entity: 'Category' })
  }
};

module.exports.remove = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await CategoryService.delete(req.params.id)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "CategoryController:delete")
    res.status(status).json({ message, entity: 'Category' })
  }

};


    
    
      