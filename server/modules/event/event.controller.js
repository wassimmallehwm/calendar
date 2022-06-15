const Event = require("./event.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Event(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Event creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Event'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Event.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Event getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Event'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Event.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Event getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Event'})
  }
};
    
      
module.exports.getList = async(req, res) => {
    try {
      const { page = 1, limit = 20, sortField, sortOrder } = req.query;
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: {}

      };

      if (sortField && sortOrder) {
        options.sort = {
            [sortField]: sortOrder
        }
      }

      const result = await Event.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Event list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Event'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Event.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Event update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Event'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Event.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Event delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Event'})
  }
};
    
      