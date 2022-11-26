const { ErrorsHandler } = require("../../utils");
const User = require("./user.model");
const UserService = require("./user.service");
const { RoleService } = require("../roles");

module.exports.create = async (req, res) => {
  try {
    let { email } = req.body
    const password = Math.random().toString(36).slice(-12);
    const {
      success,
      status,
      content,
      message
    } = await UserService.create({...req.body, password})
    if (success) {
      UserService.sendAccountCreationEmail({
        name: content.displayName,
        email,
        password
      })
    }

    res.status(status).json(success ? content : { message });
  } catch (err) {
    console.error("User creation failed: " + err);
    const { status, message } = ErrorsHandler.handle(err, "UserController:create")
    res.status(status).json({ message, entity: 'User' })
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await UserService.findAll(req.query)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "UserController:getAll")
    res.status(status).json({ message, entity: 'User' })
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
    } = await UserService.findById(id)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "UserController:getById")
    res.status(status).json({ message, entity: 'User' })
  }
};

module.exports.getAllPaginated = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortField = "_id", sortOrder = 1, search } = req.query;
    const {
      success,
      status,
      content,
      message
    } = await UserService.findAllPaginated({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sortField,
      sortOrder,
      search
    })
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "UserController:getAll")
    res.status(status).json({ message, entity: 'User' })
  }
};

module.exports.update = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await UserService.update(req.params.id, req.body)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "UserController:update")
    res.status(status).json({ message, entity: 'User' })
  }
};

module.exports.remove = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await UserService.delete(req.params.id)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "UserController:delete")
    res.status(status).json({ message, entity: 'User' })
  }
};

module.exports.search = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query
    const {
      success,
      status,
      content,
      message
    } = await UserService.search({ q, limit })
    res.status(status).json(success ? content : { message });
  } catch (e) {
    const { status, message } = ErrorsHandler.handle(err, "UserController:search")
    res.status(status).json({ message, entity: 'User' })
  }
}

