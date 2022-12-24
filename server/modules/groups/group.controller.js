const { ErrorsHandler } = require("../../utils");
const GroupService = require("./group.service");
const SERVICE_NAME = "GroupController"
const ENTITY_NAME = "Group"
      
module.exports.create = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await GroupService.create(req.body)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:create`)
    res.status(status).json({ message, entity: ENTITY_NAME })
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
    } = await GroupService.findAll(query)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getAll`)
    res.status(status).json({ message, entity: ENTITY_NAME })
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
    } = await GroupService.findAllPaginated({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sortField,
      sortOrder,
      search
    })
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:list`)
    res.status(status).json({ message, entity: ENTITY_NAME })
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
    } = await GroupService.findById(id)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getById`)
    res.status(status).json({ message, entity: ENTITY_NAME })
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
    } = await GroupService.findByLabel(label)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getByLabel`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.update = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await GroupService.update(req.params.id, req.body)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:update`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.remove = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await GroupService.delete(req.params.id)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }

};


    
    
      