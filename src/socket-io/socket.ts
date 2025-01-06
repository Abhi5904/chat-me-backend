// config/socket.js
import { Server } from 'socket.io';

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://chat-me-frontend.vercel.app'], // Adjust based on your frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    },
    pingTimeout: 60000,
    connectTimeout: 60000,
    // Add transport options
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

const getSocket = () => io;

export { initializeSocket, getSocket };
