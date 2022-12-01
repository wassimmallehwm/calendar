const Category = require("./category.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils/");
const SERVICE_NAME = "CategoryService"

class CategoryService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new CategoryService()
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
                    message: `Unvalid Category label !`
                })

            const category = new Category(data);

            const result = await category.save();
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
            const result = await Category.find(query)
                .select('label')
                .exec();
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Category not found !`
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
            const total = await Category.find(filter)
                .count()
                .exec();

            let result = await Category.find(filter)
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
            const result = await Category.findById(id);
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Category not found !`
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
            const result = await Category.findOne({ label });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Category "${label}" not found !`
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

    update = async (id, data) => {
        try {
            const category = await Category.findById(id)
            if (!category)
                return new ResponseError({
                    status: 404,
                    message: "Category not found !"
                })
            let result = await Category.findOneAndUpdate({ _id: id }, data, { new: true });

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
            const category = await Category.findById(id)
            if (!category)
                return new ResponseError({
                    status: 404,
                    message: "Category not found !"
                })
            const result = await Category.deleteOne({ _id: id });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`))
        }
    }
}

module.exports = CategoryService.getInstance()
