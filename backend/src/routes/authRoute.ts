import { Router } from "express";
import { body, param } from 'express-validator'
import { authController } from '../controllers/authController'
import { handleInputErrores } from "../middleware/handleInputErrors";
import { limiter } from "../helpers/rateLimite";
import { authenticate } from "../middleware/jwt";

const router = Router();

router.use(limiter)

router.post('/login',
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isString().notEmpty().withMessage('Contraseña no puede estar vacía'),
    authController.login)

router.post('/login/forgot-password',
    body('email').isEmail().withMessage('Email no válido'),
    handleInputErrores,
    authController.forgotPassword)

router.post('/login/validate-token',
    body('token').notEmpty().isLength({ min: 6, max: 6 }).withMessage('Token inválido'),
    handleInputErrores,
    authController.validateToken)


router.post('/login/reset-password/:token',
    param('token').notEmpty().isLength({ min: 6, max: 6 }).withMessage('Token inválido'),
    body('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    handleInputErrores,
    authController.resetPassword)


router.post('/create-account',
    body('name').isString().notEmpty().withMessage('Nombre no puede estar vacío'),
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    handleInputErrores,
    authController.createAccount) 

router.post('/confirm-account', 
    body('token').notEmpty().
    isLength({ min: 6, max: 6 }).
    withMessage('Token inválido'),
    handleInputErrores,
    authController.confirmAccount) 
    

// Usuario autenticado
router.get('/user', authenticate, authController.getUser)

router.post('/change-password', 
    body('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    body('newPassword').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    body('confirmPassword').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    handleInputErrores,
    authenticate, authController.changePassword)

router.post('/check-password',
    body('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'),
    handleInputErrores,
    authenticate, authController.checkPassword
)


export default router;