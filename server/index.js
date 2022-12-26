const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const dbConnect = require('./database');
const {expressMiddelwares} = require('./middleware');
const ioConfig = require('./socket');
const { FilesHandler } = require('./utils');


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.all("*",function(req, res, next){
    req.io = io;
    next();
});

expressMiddelwares(app, __dirname);
dbConnect();
FilesHandler.createDir('public', () => console.log('Public created'))
FilesHandler.createDir('public/images', () => console.log('Images created'))

// ioConfig(io)
server.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});