import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {
    static getAll = async (req: Request, res: Response) => {

    }

    static create = async (req: Request, res: Response) => {
        try {

            console.log(req.body)
            console.log(req.budget.id)
            const { name, amount } = req.body
            const expense = await Expense.create({ name, amount, budgetId: req.budget.id })

            console.log(expense)
            if (!expense) {
                const error = new Error('Error creating expense')
                res.status(404).json({ error: error.message })
                return
            }



            res.status(201).json('Expense created')

        } catch (error) {

             res.status(500).json({
                error: 'Error al crear el gasto', // Devuelve un campo "error"
              });
              return

        }

    }

    static getById = async (req: Request, res: Response) => {

        const expense = await Expense.findByPk(req.expense.id)

        res.status(201).json(expense)

    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body)

        res.status(201).json('Expense updated')

    }

    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy()

        res.status(201).json({ message: 'Expense deleted' })

    }
}