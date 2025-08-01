import { NextFunction, Response, Request } from 'express';
import User from '../models/User';
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
