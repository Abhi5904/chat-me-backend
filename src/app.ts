import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router';
import glboalErrorHandling from './middleware/globalError.middleware';
import ApiError from './utils/apiError.util';
import statusCode from './utils/statusCode.util';
import multer from 'multer';
import { generateKeyPair } from 'crypto';
import appConfig from './config/appConfig';
import fs from 'fs';
import path from 'path';

const app = express();

// // Set up multer
// const upload = multer();

// // Middleware to handle form data (no file upload)
// app.use(upload.none());

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://chat-me-frontend.vercel.app/'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
    exposedHeaders: ['Authorization', 'X-Custom-Header'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);
app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the handler for the root path
app.get('/', (req, res) => {
  return res.send('Chat app running.....');
});

// generate JWT priavat and public keys

// export const setJWT_KEYS = () => {
//   const folderPath = path.resolve(`${__dirname}/jwt_keys`);
//   // Ensure the folder exists
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }

//   generateKeyPair(
//     'rsa',
//     {
//       modulusLength: 4096,
//       publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem',
//       },
//       privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem',
//         cipher: 'aes-256-cbc',
//         passphrase: appConfig.SECRET_KEY,
//       },
//     },
//     (err, publicKey, privateKey) => {
//       if (err) {
//         console.error('Error generating key pair:', err);
//         return;
//       }

//       try {
//         fs.writeFileSync(`${folderPath}/jwtRS256.key`, privateKey);
//         fs.writeFileSync(`${folderPath}/jwtRS256.key.pub`, publicKey);
//         console.log('Keys generated and saved successfully');
//       } catch (writeErr) {
//         console.error('Error writing keys to files:', writeErr);
//       }
//     },
//   );
// };

// Your other routes, e.g., '/api'
app.use('/api', router);

// Handle undefined routes (404 error for any path not defined in the app)
app.all('*', (req, res, next) => {
  return next(new ApiError('Not Found', statusCode.NOT_FOUND));
});

// Global error handling middleware
app.use(glboalErrorHandling);

export default app;
