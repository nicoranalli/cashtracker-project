"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No Autorizado');
        res.status(401).json({ error: error.message });
        return;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        const error = new Error('No Autorizado');
        res.status(401).json({ error: error.message });
        return;
    }
    try {
        const result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof result === 'object' && result.userId) {
            req.user = await User_1.default.findByPk(result.userId, {
                attributes: ['id', 'name', 'email']
            });
        }
        else {
            const error = new Error('Token no válido');
            res.status(401).json({ error: error.message });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Token No Válido' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=jwt.js.map