import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from '../controllers/budgetsController'
import { validateBudgetExists, validateBudgetId, validateBudgetInput, validateBudgetUser } from "../middleware/budget";
import { ExpensesController } from "../controllers/expensesController";
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from "../middleware/expense";
import { authenticate } from "../middleware/jwt";

const router = Router()

router.use(authenticate)

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists) //Nos da acceso a req.budget
router.param('budgetId', validateBudgetUser)


router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)


router.get('/', BudgetController.getAll)
router.post('/', validateBudgetInput, BudgetController.create)
router.get('/:budgetId', BudgetController.getById)
router.put('/:budgetId', validateBudgetInput, BudgetController.updateById)
router.delete('/:budgetId', validateBudgetId, BudgetController.deleteById)


/**Expenses routes**/

router.post('/:budgetId/expenses', validateExpenseInput, ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId',  ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', validateExpenseInput, ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router
