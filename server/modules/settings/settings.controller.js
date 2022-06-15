const Settings = require("./settings.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Settings(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Settings creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Settings'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Settings.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Settings getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Settings'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Settings.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Settings getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Settings'})
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

      const result = await Settings.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Settings list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Settings'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Settings.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Settings update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Settings'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Settings.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Settings delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Settings'})
  }
};
    
      