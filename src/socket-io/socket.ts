// config/socket.js
import { Server } from 'socket.io';

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Adjust based on your frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
  });
  console.log('Socket.IO initialized');
};

const getSocket = () => io;

export { initializeSocket, getSocket };
