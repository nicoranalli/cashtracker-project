import type { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export class BudgetController {
    public static async getAll(req: Request, res: Response) {
        try {

            const userID = req.user.id;

            const budgets = await Budget.findAll(
                {
                    where: { userId: userID },
                    order: [
                        
                        ['createdAt', 'DESC']
                    ]
                }
            );

            if (budgets.length === 0) {
                const error = new Error('El usuario no tiene presupuestos');
                res.status(404).json({ error: error.message });
                return
            }
            res.status(201).json(budgets);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    public static async getById(req: Request, res: Response) {
        const budget = await Budget.findByPk(req.budget.id, { include: Expense });
        res.status(201).json(budget);
    }


    public static async create(req: Request, res: Response) {
        try {
            const { name, amount } = req.body;       

            const budget = await Budget.create({ name, amount, userId: req.user.id });
            res.status(201).json('Budget created');

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public static async updateById(req: Request, res: Response) {
        const id  = req.budget.id;
        const { name, amount } = req.body;

        console.log(id, name, amount)

        try {
            const result = await Budget.update({ name, amount }, { where: { id } });
            if (Number(result[0]) === 0) {
                const error = new Error('Budget not found');
                res.status(404).json({ error: error.message });
                return
            }
            res.status(201).json({ message: 'Budget updated' });


        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public static async deleteById(req: Request, res: Response) {
        const  id  = req.budget.id;
        try {
            const result = await Budget.destroy({ where: { id } });
            if (result === 0) {
                const error = new Error('Budget not found');
                res.status(404).json({ error: error.message });
                return
            }
            res.status(201).json({ message: 'Budget deleted' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

