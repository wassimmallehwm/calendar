const User = require("./user.model");
const {
    APP_NAME, MAIL_ACCOUNT_VERIFICATION, MAIL_ACCOUNT_CREATION
} = require("../../config");
const { ResponseError, ResponseSuccess } = require("../../shared/response");
const UserDto = require("./user.dto");
const { ErrorsHandler } = require("../../utils");
const { JwtService, PasswordEncoder } = require("../../security");
const EmailService = require("../../mails/email.service");
const { RoleService } = require("../roles");
const { default: mongoose } = require("mongoose");


class UserService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new UserService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    create = async ({
        email,
        firstname,
        lastname,
        role,
        password
    }) => {
        try {
            const user = await User.findOne({ email });
            if (user)
                return new ResponseError({
                    status: 400,
                    message: "Account already exists with this email !"
                })
            password = await PasswordEncoder.hash(password)

            const item = new User({
                email,
                firstname,
                lastname,
                role,
                password
            });

            let result = await item.save();
            result = await result.populate([
                { path: 'role', model: 'Role', select: 'label' },
                { path: 'groups', model: 'Group', select: 'label' }
            ])
            return new ResponseSuccess({
                status: 201,
                content: new UserDto(result)
            })

        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:create")
            return new ResponseError({
                status,
                message
            })
        }
    }

    findById = async (id) => {
        try {
            const result = await User.findById(id)
                .populate({ path: 'role', model: 'Role', select: 'label' })
                .populate({ path: 'groups', model: 'Group', select: 'label' });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: "User not found !"
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: new UserDto(result)
            })

        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:findById")
            return new ResponseError({
                status,
                message
            })
        }
    }

    findAll = async (query = {}) => {
        try {
            let result = await User.find(query)
                .populate({ path: 'role', model: 'Role', select: 'label' })
                .populate({ path: 'groups', model: 'Group', select: 'label' });
            if (result) {
                result = result.map(elem => new UserDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:findAll")
            return new ResponseError({
                status,
                message
            })
        }
    }

    findAllPaginated = async ({ page, limit, sortField, sortOrder, search }) => {
        try {
            let filter = {}
            if (search && search.trim() !== "") {
                filter = {
                    $or: [
                        { firstname: { $regex: search, $options: 'i' } },
                        { lastname: { $regex: search, $options: 'i' } }
                    ]
                }
            }
            const total = await User.find(filter)
                .count()
                .exec();

                console.log(JSON.stringify(filter))

            let result = await User.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ [sortField.replace('displayName', 'firstname')]: sortOrder })
                .populate({ path: 'role', model: 'Role', select: 'label' })
                .populate({ path: 'groups', model: 'Group', select: 'label' })
                .exec();

            if (result) {
                result = result.map(elem => new UserDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit),
                        docs: result
                    }
                })
            }
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:findAllPaginated")
            return new ResponseError({
                status,
                message
            })
        }
    }

    update = async (id, data) => {
        try {
            const user = await User.findById(id)
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: "User not found !"
                })
            let result = await User.findOneAndUpdate({ _id: id }, data, { new: true });
            result = await result.populate([
                { path: 'role', model: 'Role', select: 'label' },
                { path: 'groups', model: 'Group', select: 'label' }
            ]);

            return new ResponseSuccess({
                status: 200,
                content: new UserDto(result)
            })
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:update")
            return new ResponseError({
                status,
                message
            })
        }
    }

    delete = async (id) => {
        try {
            const user = await User.findById(id)
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: "User not found !"
                })
            const result = await User.deleteOne({ _id: id });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:delete")
            return new ResponseError({
                status,
                message
            })
        }
    }

    search = async ({ q, limit }) => {
        try {
            const filter = {
                //'_id': { $ne: currentUserId },
                $or: [
                    { firstname: { $regex: q, $options: 'i' } },
                    { lastname: { $regex: q, $options: 'i' } },
                    { email: { $regex: q, $options: 'i' } }
                ]
            }
            let result = await User.find(filter)
                .populate({ path: 'role', model: 'Role', select: 'label' })
                .populate({ path: 'groups', model: 'Group', select: 'label' })
                .select('firstname lastname email imagePath')
                .limit(limit)
                .exec();
            if (result) {
                result = result.map(elem => new UserDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, "UserService:search")
            return new ResponseError({
                status,
                message
            })
        }
    }

    sendAccountVerificationEmail = ({ id, role, name, email }) => {
        const token = JwtService.generateToken({ id, role, groups: [] });
        var mailOptions = {
            to: email,
            subject: `${APP_NAME} - Verify your account`,
            html: EmailService.get(MAIL_ACCOUNT_VERIFICATION)(name, token)
        };
        EmailService.send(mailOptions);
    }

    sendAccountCreationEmail = ({ name, email, password }) => {
        var mailOptions = {
            to: email,
            subject: `${APP_NAME} - Account created`,
            html: EmailService.get(MAIL_ACCOUNT_CREATION)(name, email, password)
        };
        EmailService.send(mailOptions);
    }

    createMockUsers = async (roleId) => {
        for (let index = 1; index < 20; index++) {
            let i = 0
            if(index < 10){
                i = `0${index}`
            } else {
                i = index
            }
            const password = await PasswordEncoder.hash(`user${i}`)
            const item = new User({
                email: `user${i}@mail.com`,
                firstname: `user${i}`,
                lastname: `user${i}`,
                role: new mongoose.Types.ObjectId(roleId),
                password
            });
            await item.save();

        }
    }

    nullOrEmpty = (data) => {
        return !data || data.trim() == ""
    }
}

module.exports = UserService.getInstance()
