"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const generateToken = () => {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=token.js.map