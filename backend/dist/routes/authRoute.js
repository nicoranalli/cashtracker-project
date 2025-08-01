"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const handleInputErrors_1 = require("../middleware/handleInputErrors");
const rateLimite_1 = require("../helpers/rateLimite");
const jwt_1 = require("../middleware/jwt");
const router = (0, express_1.Router)();
router.use(rateLimite_1.limiter);
router.post('/login', (0, express_validator_1.body)('email').isEmail().withMessage('Email no válido'), (0, express_validator_1.body)('password').isString().notEmpty().withMessage('Contraseña no puede estar vacía'), authController_1.authController.login);
router.post('/login/forgot-password', (0, express_validator_1.body)('email').isEmail().withMessage('Email no válido'), handleInputErrors_1.handleInputErrores, authController_1.authController.forgotPassword);
router.post('/login/validate-token', (0, express_validator_1.body)('token').notEmpty().isLength({ min: 6, max: 6 }).withMessage('Token inválido'), handleInputErrors_1.handleInputErrores, authController_1.authController.validateToken);
router.post('/login/reset-password/:token', (0, express_validator_1.param)('token').notEmpty().isLength({ min: 6, max: 6 }).withMessage('Token inválido'), (0, express_validator_1.body)('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'), handleInputErrors_1.handleInputErrores, authController_1.authController.resetPassword);
router.post('/create-account', (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Nombre no puede estar vacío'), (0, express_validator_1.body)('email').isEmail().withMessage('Email no válido'), (0, express_validator_1.body)('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'), handleInputErrors_1.handleInputErrores, authController_1.authController.createAccount);
router.post('/confirm-account', (0, express_validator_1.body)('token').notEmpty().
    isLength({ min: 6, max: 6 }).
    withMessage('Token inválido'), handleInputErrors_1.handleInputErrores, authController_1.authController.confirmAccount);
// Usuario autenticado
router.get('/user', jwt_1.authenticate, authController_1.authController.getUser);
router.post('/change-password', (0, express_validator_1.body)('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'), (0, express_validator_1.body)('newPassword').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'), (0, express_validator_1.body)('confirmPassword').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'), handleInputErrors_1.handleInputErrores, jwt_1.authenticate, authController_1.authController.changePassword);
router.post('/check-password', (0, express_validator_1.body)('password').isString().isLength({ min: 8 }).withMessage('Contraseña debe tener al menos 8 caracteres'), handleInputErrors_1.handleInputErrores, jwt_1.authenticate, authController_1.authController.checkPassword);
exports.default = router;
//# sourceMappingURL=authRoute.js.map