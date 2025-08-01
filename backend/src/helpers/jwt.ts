import jwt from 'jsonwebtoken'

export const generateJwt = (id: string | object | Buffer): string => {
    return jwt.sign(id, process.env.JWT_SECRET, { expiresIn: '1h' });
}