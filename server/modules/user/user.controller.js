const User = require("./user.model");
const errorHandler = require("../../utils/errorHandler");
const { comparePasswords, generateToken, hashPassword } = require("../../utils/auth");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Fields missing !" })

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "Account does not exist !" })

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch)
      return res.status(404).json({ msg: "Invalid Credentials !" })

    const token = generateToken(user._id);
    user.password = undefined
    res.status(200).json({user, token});
  } catch (err) {
    const { status, message } = errorHandler(err)
    res.status(status).json(message)
  }
}

module.exports.create = async (req, res) => {
  try {
    let item = req.body

    const user = await User.findOne({ email: item.email });
    if (user)
      return res.status(400).json({ msg: "Email already used !" })

    item.password = hashPassword(item.password)
    item = new User(item);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("User creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await User.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.getList = async (req, res) => {
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

    const result = await User.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("User list failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("User update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("User delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};

// module.exports.refresh = async (req, res) => {
//   try {
//       const verifUser = jwt.verify(req.header("x-auth-token"), process.env.JWT_SECRET, {
//           ignoreExpiration: true
//       });
//       const user = await User.findById(verifUser._id);
//       const token = generateToken(user._id);
//       res.status(200).json({ token });
//   } catch (err) {
//       const { status, message } = errorHandler(err)
//       res.status(status).json(message)
//   }
// }

// module.exports.uploadImage = async (req, res) => {
//   try {
//       await singleFileUpload(req, res, 'user', 'images/users', async (filename) => {
//           const user = await User.findOne({ _id: req.user });
//           user.imagePath = filename;
//           await user.save();
//           return res.status(200).send(req.file)
//       })
//   } catch (err) {
//       const { status, message } = errorHandler(err)
//       res.status(status).json(message)
//   }
// }

// module.exports.update = async (req, res) => {
//   try {
//       let user = await User.findOne({ _id: req.user });
//       if (!user) {
//           res.status(404).send('User no found !')
//       } else {
//           user = await User.findOneAndUpdate({ _id: req.user }, req.body, { new: true });
//           user.password = undefined;
//           user.mails = undefined;
//           user.accounts = undefined;
//           const response = userResponse(user)
//           res.status(200).json(response);
//       }
//   } catch (e) {
//       console.log('ERROR', e);
//       res.status(400).send('Error adding a User')
//   }
// }

// module.exports.edit = async (req, res) => {
//   try {
//       const userDetails = req.body;
//       let user = await User.findOne({ _id: userDetails._id });
//       if (!user) {
//           res.status(404).send('User no found !')
//       } else {
//           user = await User.findOneAndUpdate({ _id: userDetails._id }, userDetails, { new: true })
//           const response = await User.findById(user._id).select('_id username createdAt')
//               .populate({ path: 'role', model: 'Role', select: 'label' }).exec();
//           res.status(200).json(response);
//       }
//   } catch (err) {
//       const { status, message } = errorHandler(err)
//       res.status(status).json(message)
//   }
// }

// module.exports.changePassword = async (req, res) => {
//   try {
//       const { password, newPassword, newPasswordCheck } = req.body;
//       let user = await User.findOne({ _id: req.user });

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch)
//           return res.status(404).json({ msg: "Invalid Password !" })

//       if (newPassword != newPasswordCheck)
//           return res.status(400).json({ msg: "Password and Password Check do not match!" })

//       const salt = await bcrypt.genSalt()
//       const hashedPassword = await bcrypt.hash(newPassword, salt);
//       user.password = hashedPassword;
//       await user.save();
//       res.status(200).json(true);
//   } catch (err) {
//       const { status, message } = errorHandler(err)
//       res.status(status).json(message)
//   }
// }

