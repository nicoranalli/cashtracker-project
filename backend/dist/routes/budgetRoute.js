"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budgetsController_1 = require("../controllers/budgetsController");
const budget_1 = require("../middleware/budget");
const expensesController_1 = require("../controllers/expensesController");
const expense_1 = require("../middleware/expense");
const jwt_1 = require("../middleware/jwt");
const router = (0, express_1.Router)();
router.use(jwt_1.authenticate);
router.param('budgetId', budget_1.validateBudgetId);
router.param('budgetId', budget_1.validateBudgetExists); //Nos da acceso a req.budget
router.param('budgetId', budget_1.validateBudgetUser);
router.param('expenseId', expense_1.validateExpenseId);
router.param('expenseId', expense_1.validateExpenseExists);
router.get('/', budgetsController_1.BudgetController.getAll);
router.post('/', budget_1.validateBudgetInput, budgetsController_1.BudgetController.create);
router.get('/:budgetId', budgetsController_1.BudgetController.getById);
router.put('/:budgetId', budget_1.validateBudgetInput, budgetsController_1.BudgetController.updateById);
router.delete('/:budgetId', budget_1.validateBudgetId, budgetsController_1.BudgetController.deleteById);
/**Expenses routes**/
router.post('/:budgetId/expenses', expense_1.validateExpenseInput, expensesController_1.ExpensesController.create);
router.get('/:budgetId/expenses/:expenseId', expensesController_1.ExpensesController.getById);
router.put('/:budgetId/expenses/:expenseId', expense_1.validateExpenseInput, expensesController_1.ExpensesController.updateById);
router.delete('/:budgetId/expenses/:expenseId', expensesController_1.ExpensesController.deleteById);
exports.default = router;
//# sourceMappingURL=budgetRoute.js.map