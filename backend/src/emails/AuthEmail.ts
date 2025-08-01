//Email auth class
import { transport } from '../config/nodemailer'
import dotenv from 'dotenv'

dotenv.config()

type EmailType = {
    name: string,
    email: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        await transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com>',
            to: user.email,
            subject: "Cashtracker - Confirm your account",
            html: `<p>Hola! ${user.name}. Tu código de verificación es: ${user.token}</p>
                  <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            `,
        })

        console.log('Email enviado')
    }

    static sendResetPasswordEmail = async (user: EmailType) => {
        await transport.sendMail({
            from: 'CashTracker <admin@cashtracker.com>',
            to: user.email,
            subject: "Cashtracker - Reset your password",
            html: `<p>Hola! ${user.name}. Tu código de reseteo es: ${user.token}</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Resetear password</a>
            `,
        })

        console.log('Email enviado')

    }

}