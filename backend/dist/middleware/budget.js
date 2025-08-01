"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBudgetUser = exports.validateBudgetExists = exports.validateBudgetInput = exports.validateBudgetId = void 0;
const express_validator_1 = require("express-validator");
const Budget_1 = __importDefault(require("../models/Budget"));
const validateBudgetId = async (req, res, next) => {
    await (0, express_validator_1.param)('budgetId').isInt().withMessage('Id no válido')
        .custom(value => value > 0).withMessage('Id no válido').run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validateBudgetId = validateBudgetId;
const validateBudgetInput = async (req, res, next) => {
    await (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required').run(req);
    await (0, express_validator_1.body)('amount').custom(value => value > 0).withMessage('Amount must be 0 or positive').run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validateBudgetInput = validateBudgetInput;
const validateBudgetExists = async (req, res, next) => {
    try {
        const { budgetId } = req.params;
        console.log(budgetId);
        const budget = await Budget_1.default.findByPk(budgetId);
        if (!budget) {
            res.status(404).json({ msg: 'Budget not found' });
            return;
        }
        req.budget = budget;
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.validateBudgetExists = validateBudgetExists;
const validateBudgetUser = async (req, res, next) => {
    try {
        if (req.budget.userId !== req.user.id) {
            res.status(401).json('No puedes acceder a este presupuesto');
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.validateBudgetUser = validateBudgetUser;
//# sourceMappingURL=budget.js.map