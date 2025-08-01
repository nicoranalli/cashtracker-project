"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExpenseExists = exports.validateExpenseId = exports.validateExpenseInput = void 0;
const express_validator_1 = require("express-validator");
const Expense_1 = __importDefault(require("../models/Expense"));
const validateExpenseInput = async (req, res, next) => {
    await (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required').run(req);
    await (0, express_validator_1.body)('amount').custom(value => value > 0).withMessage('Amount must be 0 or positive').run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.status(500).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validateExpenseInput = validateExpenseInput;
const validateExpenseId = async (req, res, next) => {
    await (0, express_validator_1.param)('expenseId').isInt().withMessage('Id no válido')
        .custom(value => value > 0).withMessage('Id no válido').run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validateExpenseId = validateExpenseId;
const validateExpenseExists = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const expense = await Expense_1.default.findByPk(expenseId);
        if (!expense) {
            res.status(404).json({ msg: 'Expense not found' });
            return;
        }
        req.expense = expense;
        next();
    }
    catch (error) {
        res.send(500).json({ error: error.message });
    }
};
exports.validateExpenseExists = validateExpenseExists;
//# sourceMappingURL=expense.js.map