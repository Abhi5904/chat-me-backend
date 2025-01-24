"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = exports.initializeSocket = void 0;
// config/socket.js
const socket_io_1 = require("socket.io");
let io;
const initializeSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            // origin: ['http://localhost:3000', 'https://chat-me-frontend.vercel.app'],
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials: true,
        },
        path: '/socket',
        allowEIO3: true,
        pingTimeout: 60000,
        connectTimeout: 60000,
        transports: ['websocket', 'polling'],
    });
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });
    });
    console.log('Socket.IO initialized');
};
exports.initializeSocket = initializeSocket;
const getSocket = () => io;
exports.getSocket = getSocket;
//# sourceMappingURL=socket.js.map