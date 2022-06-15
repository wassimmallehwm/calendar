const Space = require("./space.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Space(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Space creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Space'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Space.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Space getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Space'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Space.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Space getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Space'})
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

      const result = await Space.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Space list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Space'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Space.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Space update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Space'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Space.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Space delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Space'})
  }
};
    
      