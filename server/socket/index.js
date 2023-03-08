const { addUser, removeSocketByUserId } = require("./users")

const ioConfig = (io) => {

    io.on('connect', (socket) => {
        let { userId, groups, role } = socket.handshake.query
        addUser(userId, socket)

        socket.join('Global')
        groups = groups.split(',')
        if (groups.length > 0) {
            groups.forEach(group => {
                socket.join(group)
            });
        }

        socket.on('disconnect', function (e) {
            console.log("user disconnected");
            removeSocketByUserId(userId)
        });

        socket.on('connect_error', function (e) {
            console.log("Socket connection error");
            removeSocketByUserId(userId)
        });
    })
}

module.exports = ioConfig;