import { Request, Response } from 'express';
export declare class authController {
    static createAccount(req: Request, res: Response): Promise<void>;
    static confirmAccount(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
    static forgotPassword(req: Request, res: Response): Promise<void>;
    static validateToken(req: Request, res: Response): Promise<void>;
    static resetPassword(req: Request, res: Response): Promise<void>;
    static getUser(req: Request, res: Response): Promise<void>;
    static changePassword(req: Request, res: Response): Promise<void>;
    static checkPassword(req: Request, res: Response): Promise<void>;
}
