"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../helpers/auth");
const token_1 = require("../helpers/token");
const AuthEmail_1 = require("../emails/AuthEmail");
const jwt_1 = require("../helpers/jwt");
class authController {
    static async createAccount(req, res) {
        try {
            const { name, email, password } = req.body;
            // Verificar si el correo electrónico ya está en uso
            const userExists = await User_1.default.findOne({ where: { email } });
            if (userExists) {
                const error = new Error('Ya existe una cuenta con ese correo');
                res.status(409).json({ error: error.message });
                return;
            }
            // Hashear la contraseña
            const hashedPassword = await (0, auth_1.hashPassword)(password);
            //Generamos token de confirmación
            const token = (0, token_1.generateToken)();
            // Crear el usuario con la contraseña hash
            const user = await User_1.default.create({ name, email, password: hashedPassword, token: token });
            // Enviar correo de confirmación
            await AuthEmail_1.AuthEmail.sendConfirmationEmail({ name, email, token });
            res.status(201).json('Cuenta creada exitosamente');
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async confirmAccount(req, res) {
        try {
            const { token } = req.body;
            // Buscar el usuario por el token
            const user = await User_1.default.findOne({ where: { token } });
            if (!user) {
                const error = new Error('Token inválido o expirado');
                res.status(400).json({ error: error.message });
                return;
            }
            // Confirmar la cuenta del usuario
            user.confirmed = true;
            user.token = null;
            await user.save();
            res.status(200).json('Cuenta confirmada exitosamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al confirmar cuenta' });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            // Buscar el usuario por el correo
            const user = await User_1.default.findOne({ where: { email } });
            if (!user) {
                const error = new Error('Correo no registrado');
                res.status(404).json({ error: error.message });
                return;
            }
            // Verificar la contraseña
            const isMatch = await (0, auth_1.comparePassword)(password, user.password);
            if (!isMatch) {
                const error = new Error('Contraseña incorrecta');
                res.status(401).json({ error: error.message });
                return;
            }
            // Verificar si la cuenta está confirmada
            if (!user.confirmed) {
                const error = new Error('Debes confirmar tu cuenta para iniciar sesión. Revisa tu correo');
                res.status(403).json({ error: error.message });
                return;
            }
            // Generar token de acceso
            const token = (0, jwt_1.generateJwt)({ userId: user.id });
            res.status(200).json(token);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            // Buscar el usuario por el correo
            const user = await User_1.default.findOne({ where: { email } });
            if (!user) {
                const error = new Error('Correo no registrado');
                res.status(404).json({ error: error.message });
                return;
            }
            // Generar token de reseteo
            const token = (0, token_1.generateToken)();
            // Actualizar el token de reseteo
            user.token = token;
            await user.save();
            // Enviar correo de reseteo
            await AuthEmail_1.AuthEmail.sendResetPasswordEmail({ name: user.name, email, token });
            res.status(200).json('Correo de reseteo enviado');
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async validateToken(req, res) {
        try {
            const { token } = req.body;
            // Buscar el usuario por el token
            const tokenExists = await User_1.default.findOne({ where: { token } });
            if (!tokenExists) {
                const error = new Error('Token inválido o expirado');
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(200).json('Token válido');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al validar el token' });
        }
    }
    static async resetPassword(req, res) {
        try {
            const { password } = req.body;
            const { token } = req.params;
            // Buscar el usuario por el token
            const user = await User_1.default.findOne({ where: { token } });
            if (!user) {
                const error = new Error('Token inválido o expirado');
                res.status(400).json({ error: error.message });
                return;
            }
            // Hashear la nueva contraseña
            const hashedPassword = await (0, auth_1.hashPassword)(password);
            // Actualizar la contraseña
            user.password = hashedPassword;
            user.token = null;
            await user.save();
            res.status(200).json('Contraseña actualizada');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al resetear el password' });
        }
    }
    static async getUser(req, res) {
        try {
            const user = req.user;
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }
    static async changePassword(req, res) {
        try {
            const { password, newPassword, confirmPassword } = req.body;
            //Obtenemos la contraseña del usuario
            const user = await User_1.default.findByPk(req.user.id);
            // Verificar la contraseña actual
            const isMatch = await (0, auth_1.comparePassword)(password, user.password);
            if (!isMatch) {
                const error = new Error('La contraseña actual es incorrecta');
                res.status(401).json({ error: error.message });
                return;
            }
            // Verificar si la nueva contraseña y la confirmación coinciden
            if (newPassword !== confirmPassword) {
                const error = new Error('Las contraseñas no coinciden');
                res.status(400).json({ error: error.message });
                return;
            }
            // Hashear la nueva contraseña
            const hashedPassword = await (0, auth_1.hashPassword)(newPassword);
            // Actualizar la contraseña
            req.user.password = hashedPassword;
            await req.user.save();
            res.status(200).json('Contraseña actualizada');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al cambiar la contraseña' });
        }
    }
    static async checkPassword(req, res) {
        try {
            const { password } = req.body;
            //Obtenemos la contraseña del usuario
            const user = await User_1.default.findByPk(req.user.id);
            // Verificar la contraseña
            const isMatch = await (0, auth_1.comparePassword)(password, user.password);
            if (!isMatch) {
                const error = new Error('La contraseña actual es incorrecta');
                res.status(401).json({ error: error.message });
                return;
            }
            res.status(200).json('Contraseña correcta');
        }
        catch (error) {
            res.status(500).json({ error: 'Error al verificar la contraseña' });
        }
    }
}
exports.authController = authController;
//# sourceMappingURL=authController.js.map