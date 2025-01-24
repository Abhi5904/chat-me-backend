"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueId = void 0;
const uuid_1 = require("uuid");
const generateUniqueId = (letter) => (0, uuid_1.v4)()
    .replace(/-/g, '')
    .slice(0, letter || 3);
exports.generateUniqueId = generateUniqueId;
//# sourceMappingURL=generateId.util.js.map