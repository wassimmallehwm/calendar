const AuthService = require("./auth.service");
const { ErrorsHandler } = require("../../utils");
const { UserService } = require("../users");
const { JwtService } = require("../../security");


module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { success, status, content, message } = await AuthService.authenticate({ username, password })
    res.status(status)
    .cookie('access_token', content.access_token, { 
      maxAge: JwtService.expiration(content.access_token),
      httpOnly: true 
    })
    .cookie('refresh_token', content.refresh_token, { 
      maxAge: JwtService.expiration(content.refresh_token),
      httpOnly: false 
    })
    .json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "AuthController:login")
    res.status(status).json({ message, entity: 'User' })
  }
}

module.exports.refresh_token = async (req, res) => {
  try {
    const { success, status, content, message } = await AuthService.refresh_token(req.user._id)
    res.status(status)
    .cookie('access_token', content.access_token, { 
      maxAge: JwtService.expiration(content.access_token),
      httpOnly: true 
    })
    .cookie('refresh_token', content.refresh_token, { 
      maxAge: JwtService.expiration(content.refresh_token),
      httpOnly: false 
    })
    .json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "AuthController:refresh_token")
    res.status(status).json({ message, entity: 'User' })
  }
}

module.exports.signup = async (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      password,
      passwordConfirm
    } = req.body
    const { success, status, content, message } = await AuthService.signup({
      email,
      firstname,
      lastname,
      password,
      passwordConfirm
    })
    if (success) {
      UserService.sendAccountVerificationEmail({
        id: content._id,
        role: content.role,
        email,
        name: content.displayName
      })
    }
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "AuthController:signup")
    res.status(status).json({ message, entity: 'User' })
  }
};
