const { ErrorsHandler } = require("../../utils");
const EventsService = require("./event.service");

const SERVICE_NAME = "EventsController"
const ENTITY_NAME = "Event"

module.exports.create = async (req, res) => {
  try {
    let item = req.body;
    item.createdBy = req.user
    const {
      success,
      status,
      content,
      message
    } = await EventsService.create(item)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:create`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await EventsService.findAll(req.query)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getAll`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.getByRange = async (req, res) => {
  try {
    const { start, end } = req.query
    const {
      success,
      status,
      content,
      message
    } = await EventsService.findByRange(start, end)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getByRange`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      success,
      status,
      content,
      message
    } = await EventsService.findById(id)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getById`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.getPaginated = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortField = "_id", sortOrder = -1, search } = req.query;
    const {
      success,
      status,
      content,
      message
    } = await EventsService.findAllPaginated({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sortField,
      sortOrder,
      search
    })
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getPaginated`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.update = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await EventsService.update(req.params.id, req.body)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:update`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.remove = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await EventsService.delete(req.params.id)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

