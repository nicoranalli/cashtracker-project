import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from "express-validator";
import Expense from '../models/Expense';

declare global {
    namespace Express {
        interface Request {
            expense: Expense
        }
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name').isString().notEmpty().withMessage('Name is required').run(req);
    await body('amount').custom(value => value > 0).withMessage('Amount must be 0 or positive').run(req);

    const errors = validationResult(req);

    console.log(errors)
    if (!errors.isEmpty()) {
         res.status(500).json({ errors: errors.array() });
         return
    }

    next();
}

export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {

    await param('expenseId').isInt().withMessage('Id no válido')
        .custom(value => value > 0).withMessage('Id no válido').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
         return
    }

    next();
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { expenseId } = req.params;

        const expense = await Expense.findByPk(expenseId);

        if (!expense) {
            res.status(404).json({ msg: 'Expense not found' });
            return
        }

        req.expense = expense;
        next();
        
    } catch (error) {
        res.send(500).json({ error: error.message });
    }
}
