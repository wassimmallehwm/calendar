let connectedUsers = new Map()

const addUser = (userId, socket) => {
    if(connectedUsers.has(userId)){
        return;
    }
    connectedUsers.set(userId, socket)
}

const getSocketByUserId = (userId) => {
    return connectedUsers.get(userId)
}

const getAllUsers = () => {
    return connectedUsers
}

const removeSocketByUserId = (userId) => {
    connectedUsers.delete(userId)
}

module.exports = {
    addUser,
    getSocketByUserId,
    getAllUsers,
    removeSocketByUserId
}