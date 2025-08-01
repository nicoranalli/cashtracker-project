//middleware that  validate budgetId
import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import Budget from '../models/Budget';

declare global {
    namespace Express {
        interface Request {
            budget: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param('budgetId').isInt().withMessage('Id no válido')
        .custom(value => value > 0).withMessage('Id no válido').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
    }

    next();
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name').isString().notEmpty().withMessage('Name is required').run(req);
    await body('amount').custom(value => value > 0).withMessage('Amount must be 0 or positive').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
    }

    next();
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { budgetId } = req.params;
        console.log(budgetId)
        const budget = await Budget.findByPk(budgetId);

        if (!budget) {
            res.status(404).json({ msg: 'Budget not found' });
            return
        }
        req.budget = budget;

        next();
    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}

export const validateBudgetUser = async (req: Request, res: Response, next: NextFunction) => {

        try {

            if (req.budget.userId !== req.user.id) {
                res.status(401).json('No puedes acceder a este presupuesto');
                return
            }

            next();

        } catch (error) {
            res.status(500).json({ error: error.message });

        }
    }






