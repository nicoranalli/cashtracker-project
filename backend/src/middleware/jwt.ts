import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Response, Request } from 'express';
import User from '../models/User';
dotenv.config()

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        const error = new Error('No Autorizado')
         res.status(401).json({error: error.message})
         return
    }

    const [, token] = bearer.split(' ')

    if(!token) {
        const error = new Error('No Autorizado')
        res.status(401).json({error: error.message})
        return
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof result === 'object' && result.userId) {
            req.user = await User.findByPk(result.userId, {
                attributes: ['id', 'name', 'email']
            });
        } else {
            const error = new Error('Token no válido')
            res.status(401).json({error: error.message})
            return       
         }

         next()

    } catch (error) {
        res.status(500).json({error: 'Token No Válido'})
    }


}