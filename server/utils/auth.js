const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
    return token = jwt.sign({
        _id: id
    }, process.env.JWT_SECRET,
        { expiresIn: '10d' })
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

const comparePasswords = async (password, storedPassword) => {
    const isMatch = await bcrypt.compare(password, storedPassword);
    return isMatch
}

module.exports = {
    generateToken,
    hashPassword,
    comparePasswords
}