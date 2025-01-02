"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = exports.initializeSocket = void 0;
// config/socket.js
const socket_io_1 = require("socket.io");
let io;
const initializeSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:3000', // Adjust based on your frontend URL
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        },
    });
    console.log('Socket.IO initialized');
};
exports.initializeSocket = initializeSocket;
const getSocket = () => io;
exports.getSocket = getSocket;
//# sourceMappingURL=socket.js.map