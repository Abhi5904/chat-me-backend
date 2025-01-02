"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./router"));
const globalError_middleware_1 = __importDefault(require("./middleware/globalError.middleware"));
const apiError_utils_1 = __importDefault(require("./utils/apiError.utils"));
const statusCode_utils_1 = __importDefault(require("./utils/statusCode.utils"));
const app = (0, express_1.default)();
// // Set up multer
// const upload = multer();
// // Middleware to handle form data (no file upload)
// app.use(upload.none());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
    exposedHeaders: ['Authorization', 'X-Custom-Header'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.options('*', (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use('/api', router_1.default);
// Handle undefined routes (404 error for any path not defined in the app)
app.all('*', (req, res, next) => {
    return next(new apiError_utils_1.default('Not Found', statusCode_utils_1.default.NOT_FOUND));
});
// Global error handling middleware
app.use(globalError_middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map