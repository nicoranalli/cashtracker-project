"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesController = void 0;
const Expense_1 = __importDefault(require("../models/Expense"));
class ExpensesController {
    static getAll = async (req, res) => {
    };
    static create = async (req, res) => {
        try {
            console.log(req.body);
            console.log(req.budget.id);
            const { name, amount } = req.body;
            const expense = await Expense_1.default.create({ name, amount, budgetId: req.budget.id });
            console.log(expense);
            if (!expense) {
                const error = new Error('Error creating expense');
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(201).json('Expense created');
        }
        catch (error) {
            res.status(500).json({
                error: 'Error al crear el gasto', // Devuelve un campo "error"
            });
            return;
        }
    };
    static getById = async (req, res) => {
        const expense = await Expense_1.default.findByPk(req.expense.id);
        res.status(201).json(expense);
    };
    static updateById = async (req, res) => {
        await req.expense.update(req.body);
        res.status(201).json('Expense updated');
    };
    static deleteById = async (req, res) => {
        await req.expense.destroy();
        res.status(201).json({ message: 'Expense deleted' });
    };
}
exports.ExpensesController = ExpensesController;
//# sourceMappingURL=expensesController.js.map