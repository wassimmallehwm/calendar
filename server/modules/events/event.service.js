const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler, PermissionsHandler } = require("../../utils");
const Event = require("./event.model");
const EventDto = require("./event.dto");

const SERVICE_NAME = "EventsService"

class EventsService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new EventsService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    create = async (data) => {
        try {
            const event = new Event(data)
            let result = await event.save();
            result = await result.populate([
                { path: 'createdBy', model: 'User' },
                { path: 'category', model: 'Category' },
                { path: 'allowedViewers', model: 'Group' }
            ])
            return new ResponseSuccess({
                status: 200,
                content: new EventDto(result)
            })

        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:create`)
            )
        }
    }

    findById = async (id) => {
        try {
            const result = await Event.findById(id)
                .populate({ path: 'createdBy', model: 'User' })
                .populate({ path: 'category', model: 'Category' })
                .populate({ path: 'allowedViewers', model: 'Group' });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: "Event not found !"
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: new EventDto(result)
            })

        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:findById`)
            )
        }
    }

    findAll = async (query = {}) => {
        try {
            let result = await Event.find(query)
                .populate({ path: 'createdBy', model: 'User' })
                .populate({ path: 'category', model: 'Category' })
                .populate({ path: 'allowedViewers', model: 'Group' });
            if (result) {
                result = result.map(elem => new EventDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:findAll`)
            )
        }
    }

    findByRange = async (start, end, currentUser) => {
        const query = {
            $and: [
                {
                    $or: [
                        { startDate: { $gte: start } },
                        { endDate: { $lte: end } }
                    ]
                },
                this.eventsPermissions(currentUser)
            ]
        }
        try {
            let result = await Event.find(query)
                .populate({ path: 'createdBy', model: 'User' })
                .populate({ path: 'category', model: 'Category' })
                .populate({ path: 'allowedViewers', model: 'Group' });
            if (result) {
                result = result.map(elem => new EventDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:findByRange`)
            )
        }
    }

    findAllPaginated = async ({ page, limit, sortField, sortOrder, search }) => {
        try {
            let filter = {}
            if (search && search.trim() !== "") {
                filter = {
                    $or: [
                        { title: { $regex: search, $options: 'i' } }
                    ]
                }
            }
            const total = await Event.find(filter)
                .count()
                .exec();

            let result = await Event.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ [sortField]: sortOrder })
                .populate({ path: 'createdBy', model: 'User' })
                .populate({ path: 'category', model: 'Category' })
                .populate({ path: 'allowedViewers', model: 'Group' })
                .exec();

            if (result) {
                result = result.map(elem => new EventDto(elem))
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
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:findAllPaginated`)
            )
        }
    }

    update = async (id, data) => {
        try {
            const item = await Event.findById(id)
            if (!item)
                return new ResponseError({
                    status: 404,
                    message: "Event not found !"
                })
            let result = await Event.findOneAndUpdate({ _id: id }, data, { new: true });

            result = await result
                .populate([
                    { path: 'createdBy', model: 'User' },
                    { path: 'category', model: 'Category' },
                    { path: 'allowedViewers', model: 'Group' }
                ])

            return new ResponseSuccess({
                status: 200,
                content: new EventDto(result)
            })
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:update`)
            )
        }
    }

    delete = async (id) => {
        try {
            const item = await Event.findById(id)
            if (!item)
                return new ResponseError({
                    status: 404,
                    message: "Event not found !"
                })
            const result = await Event.deleteOne({ _id: id });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`)
            )
        }
    }

    eventsPermissions(currentUser) {
        const groups = currentUser.groups ? currentUser.groups.map(group => group._id) : []
        return PermissionsHandler.isAdmin(currentUser) ?
        {} : {
            $or: [
                { createdBy: currentUser },
                { allowedViewers: { $in: groups } }
            ]
        }
    }
}

module.exports = EventsService.getInstance()
