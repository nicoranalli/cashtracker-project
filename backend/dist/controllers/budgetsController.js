"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const Expense_1 = __importDefault(require("../models/Expense"));
class BudgetController {
    static async getAll(req, res) {
        try {
            const userID = req.user.id;
            const budgets = await Budget_1.default.findAll({
                where: { userId: userID },
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if (budgets.length === 0) {
                const error = new Error('El usuario no tiene presupuestos');
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(201).json(budgets);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        const budget = await Budget_1.default.findByPk(req.budget.id, { include: Expense_1.default });
        res.status(201).json(budget);
    }
    static async create(req, res) {
        try {
            const { name, amount } = req.body;
            const budget = await Budget_1.default.create({ name, amount, userId: req.user.id });
            res.status(201).json('Budget created');
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async updateById(req, res) {
        const id = req.budget.id;
        const { name, amount } = req.body;
        console.log(id, name, amount);
        try {
            const result = await Budget_1.default.update({ name, amount }, { where: { id } });
            if (Number(result[0]) === 0) {
                const error = new Error('Budget not found');
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(201).json({ message: 'Budget updated' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async deleteById(req, res) {
        const id = req.budget.id;
        try {
            const result = await Budget_1.default.destroy({ where: { id } });
            if (result === 0) {
                const error = new Error('Budget not found');
                res.status(404).json({ error: error.message });
                return;
            }
            res.status(201).json({ message: 'Budget deleted' });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.BudgetController = BudgetController;
//# sourceMappingURL=budgetsController.js.map