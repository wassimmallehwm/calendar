const Group = require("./group.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");
const SERVICE_NAME = "GroupService"

class GroupService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new GroupService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    create = async (data) => {
        try {
            if (!data.label || data.label.trim().length == 0)
                return new ResponseError({
                    status: 400,
                    message: `Unvalid Group label !`
                })

            const Group = new Group(data);

            const result = await group.save();
            if (result) {
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:create`))
        }
    }

    findAll = async (query) => {
        try {
            const result = await Group.find(query)
                .select('label')
                .exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Group not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:findAll`))
        }
    }

    findAllPaginated = async ({ page, limit, sortField, sortOrder, search }) => {
        try {
            let filter = {}
            if (search && search.trim() !== "") {
                filter = { label: { $regex: search, $options: 'i' } }
            }
            const total = await Group.find(filter)
                .count()
                .exec();

            let result = await Group.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ [sortField]: sortOrder })
                .exec();

            if (result) {
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
            const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:findAllPaginated`)
            return new ResponseError({
                status,
                message
            })
        }
    }

    findById = async (id) => {
        try {
            const result = await Group.findById(id);
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Group not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:findById`))
        }
    }

    findByLabel = async (label) => {
        try {
            const result = await Group.findOne({ label });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Group "${label}" not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:findByLabel`))
        }
    }

    findDefault = async () => {
        try {
            const result = await Group.findOne({ label: 'Default' });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Group "${label}" not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:findDefault`))
        }
    }

    update = async (id, data) => {
        try {
            const group = await Group.findById(id)
            if (!group)
                return new ResponseError({
                    status: 404,
                    message: "Group not found !"
                })
            let result = await Group.findOneAndUpdate({ _id: id }, data, { new: true });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:update`))
        }
    }

    delete = async (id) => {
        try {
            const group = await Group.findById(id)
            if (!group)
                return new ResponseError({
                    status: 404,
                    message: "Group not found !"
                })
            const result = await Group.deleteOne({ _id: id });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`))
        }
    }
}

module.exports = GroupService.getInstance()
