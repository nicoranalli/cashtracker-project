"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
//Email auth class
const nodemailer_1 = require("../config/nodemailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        await nodemailer_1.transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com>',
            to: user.email,
            subject: "Cashtracker - Confirm your account",
            html: `<p>Hola! ${user.name}. Tu código de verificación es: ${user.token}</p>
                  <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            `,
        });
        console.log('Email enviado');
    };
    static sendResetPasswordEmail = async (user) => {
        await nodemailer_1.transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com>',
            to: user.email,
            subject: "Cashtracker - Reset your password",
            html: `<p>Hola! ${user.name}. Tu código de reseteo es: ${user.token}</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Resetear password</a>
            `,
        });
        console.log('Email enviado');
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map