module.exports = class CategoryDto {
    constructor({
        _id,
        label,
        textColor,
        backgroundColor,
        createdAt
    }) {
        this.id = _id;
        this.label = label
        this.textColor = textColor
        this.backgroundColor = backgroundColor
        this.createdAt = createdAt
    }
}