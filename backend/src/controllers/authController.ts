import { Request, Response } from 'express';
import  User  from '../models/User';
import { hashPassword, comparePassword } from '../helpers/auth';
import { generateToken } from '../helpers/token';
import { AuthEmail } from '../emails/AuthEmail';
import { generateJwt }  from '../helpers/jwt';


export class authController {
    static async createAccount(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            // Verificar si el correo electrónico ya está en uso
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                const error = new Error('Ya existe una cuenta con ese correo');
                res.status(409).json({error: error.message});
                return
                 
            }

            // Hashear la contraseña
            const hashedPassword = await hashPassword(password);

            //Generamos token de confirmación
            const token = generateToken()

            // Crear el usuario con la contraseña hash
            const user = await User.create({ name, email, password: hashedPassword, token: token});

            // Enviar correo de confirmación
            await AuthEmail.sendConfirmationEmail({ name, email, token });

            res.status(201).json('Cuenta creada exitosamente');
        } catch (error) {
            res.status(500).json( { error: error.message });
        }
    }

    static async confirmAccount(req: Request, res: Response) {
        try {
            const { token } = req.body;

            // Buscar el usuario por el token
            const user = await User.findOne({ where: { token } });
            if (!user) {
                const error = new Error('Token inválido o expirado');
                res.status(400).json({error: error.message});
                return
            }

            // Confirmar la cuenta del usuario
            user.confirmed = true;
            user.token = null;
            await user.save();

            res.status(200).json('Cuenta confirmada exitosamente');
        } catch (error) {
            res.status(500).json({ error: 'Error al confirmar cuenta' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Buscar el usuario por el correo
            const user = await User.findOne({ where: { email } });
            if (!user) {
                const error = new Error('Correo no registrado');
                res.status(404).json({error: error.message});
                return
            }

            // Verificar la contraseña
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                const error = new Error('Contraseña incorrecta');
                res.status(401).json({error: error.message});
                return
            }

            // Verificar si la cuenta está confirmada
            if (!user.confirmed) {
                const error = new Error('Debes confirmar tu cuenta para iniciar sesión. Revisa tu correo');
                res.status(403).json({error: error.message});
                return
            }

            // Generar token de acceso
            const token = generateJwt({userId: user.id});

            res.status(200).json(token);


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;

            // Buscar el usuario por el correo
            const user = await User.findOne({ where: { email } });
            if (!user) {
                const error = new Error('Correo no registrado');
                res.status(404).json({error: error.message});
                return
            }

            // Generar token de reseteo
            const token = generateToken();

            // Actualizar el token de reseteo
            user.token = token;
            await user.save();

            // Enviar correo de reseteo
            await AuthEmail.sendResetPasswordEmail({ name: user.name, email, token });

            res.status(200).json('Correo de reseteo enviado');

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async validateToken(req: Request, res: Response) {
        try {
            const { token } = req.body;

            // Buscar el usuario por el token
            const tokenExists = await User.findOne({ where: { token } });
            if (!tokenExists) {
                const error = new Error('Token inválido o expirado');
                res.status(400).json({error: error.message});
                return
            }

            res.status(200).json('Token válido');

        } catch (error) {
            res.status(500).json({ error: 'Error al validar el token' });

        }
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            const { password } = req.body; 
            const { token } = req.params;

            // Buscar el usuario por el token
            const user = await User.findOne({ where: { token } });
            if (!user) {
                const error = new Error('Token inválido o expirado');
                res.status(400).json({error: error.message});
                return
            }

            // Hashear la nueva contraseña
            const hashedPassword = await hashPassword(password);

            // Actualizar la contraseña
            user.password = hashedPassword;
            user.token = null;

            await user.save();

            res.status(200).json('Contraseña actualizada');

        } catch (error) {
            res.status(500).json({ error: 'Error al resetear el password' });
        }

    }

    static async getUser(req: Request, res: Response) {
        try {
            const user = req.user;
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }

    static async changePassword(req: Request, res: Response) {

        try {
            const { password, newPassword, confirmPassword } = req.body;

            //Obtenemos la contraseña del usuario
            const user = await User.findByPk(req.user.id);

            // Verificar la contraseña actual
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                const error = new Error('La contraseña actual es incorrecta');
                res.status(401).json({error: error.message});
                return
                
            }

            // Verificar si la nueva contraseña y la confirmación coinciden
            if (newPassword !== confirmPassword) {
                const error = new Error('Las contraseñas no coinciden');
                res.status(400).json({error: error.message});
                return
            }

            
            // Hashear la nueva contraseña
            const hashedPassword = await hashPassword(newPassword);

            // Actualizar la contraseña
            req.user.password = hashedPassword;
            await req.user.save();

            res.status(200).json('Contraseña actualizada');
            
        } catch (error) {
            res.status(500).json({ error: 'Error al cambiar la contraseña' });
        }
    }

    static async checkPassword(req: Request, res: Response) {
        try {
            const { password } = req.body;

            //Obtenemos la contraseña del usuario
            const user = await User.findByPk(req.user.id);

            // Verificar la contraseña
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                const error = new Error('La contraseña actual es incorrecta');
                res.status(401).json({error: error.message});
                return
            }
            res.status(200).json('Contraseña correcta');

        } catch (error) {
            res.status(500).json({ error: 'Error al verificar la contraseña' });
        }
    }

}
