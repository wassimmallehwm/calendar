
const ioConfig = (io) => {

    io.on('connect', (socket) => {
        const groups = socket.handshake.query.groups.split(',')
        if (groups.length > 0) {
            groups.forEach(group => {
                socket.join(group)
            });
        }

        socket.on('connect_error', function (e) {
            console.log("Socket connection error");
        });
    })
}

module.exports = ioConfig;