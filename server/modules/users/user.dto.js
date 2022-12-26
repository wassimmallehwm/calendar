module.exports = class UserDto {
    constructor({
        _id,
        firstname,
        lastname,
        email,
        phone,
        role,
        groups,
        createdAt,
        imagePath
    }) {
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.displayName = `${firstname} ${lastname}`;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.groups = groups;
        this.createdAt = createdAt;
        this.imagePath = imagePath;
    }
}