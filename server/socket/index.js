
const ioConfig = (io) => {

    io.on('connect', (socket) => {
        socket.join('Global')
        const groups = socket.handshake.query.groups.split(',')
        if (groups.length > 0) {
            groups.forEach(group => {
                console.log("group : ",group)
                socket.join(group)
            });
        }

        socket.on('connect_error', function (e) {
            console.log("Socket connection error");
        });
    })
}

module.exports = ioConfig;