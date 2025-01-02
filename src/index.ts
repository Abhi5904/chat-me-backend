import connection from './config/db';
import appConfig from './config/appConfig';
import app from './app';
import { initializeSocket } from './socket-io/socket';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const startApp = async () => {
  try {
    const isConnected = await connection();
    if (isConnected) {
      const server = app.listen(appConfig.PORT || 8081, () => {
        console.log(`🚀 Server is running at port no : ${appConfig.PORT}`);
      });

      initializeSocket(server);

      process.on('unhandledRejection', (err: unknown) => {
        if (err instanceof Error) {
          console.log('UNHANDLED REJECTION! Shutting down...');
          console.log(err.name, err.message);
        } else {
          console.log('UNHANDLED REJECTION! Shutting down...');
          console.log('Unknown error:', err);
        }

        server.close(() => {
          process.exit(1);
        });
      });

      process.on('SIGTERM', () => {
        console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
        server.close(() => {
          console.log('💥 Process terminated!');
        });
      });
    } else {
      console.log('MONGO db connection failed !!!! ');
    }
  } catch (error) {
    console.log('MONGO db connection failed !!!! ', error);
  }
};

startApp();
