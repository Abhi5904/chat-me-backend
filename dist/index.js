"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const appConfig_1 = __importDefault(require("./config/appConfig"));
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./socket-io/socket");
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isConnected = yield (0, db_1.default)();
        if (isConnected) {
            const server = app_1.default.listen(appConfig_1.default.PORT || 8081, () => {
                console.log(`🚀 Server is running at port no : ${appConfig_1.default.PORT}`);
            });
            (0, socket_1.initializeSocket)(server);
            process.on('unhandledRejection', (err) => {
                if (err instanceof Error) {
                    console.log('UNHANDLED REJECTION! Shutting down...');
                    console.log(err.name, err.message);
                }
                else {
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
        }
        else {
            console.log('MONGO db connection failed !!!! ');
        }
    }
    catch (error) {
        console.log('MONGO db connection failed !!!! ', error);
    }
});
startApp();
//# sourceMappingURL=index.js.map