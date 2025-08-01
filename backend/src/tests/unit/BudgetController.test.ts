import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from "../mocks/budget";
import { BudgetController } from '../../controllers/budgetsController';
import Budget from '../../models/Budget';

jest.mock('../../models/Budget', () => {
    return {
        findAll: jest.fn()
    }
})   // This will replace the Budget model with a mock that returns the budgets array

describe('BudgetController.getAll', () => {
    it('should return 2 budgets for userId ', async () => {

        const req = createRequest(
            {
                method: 'GET',
                url: '/budgets',
                user: { id: 2 }
            }
        );
        const res = createResponse();

        // This will call the mocked findAll function with filter usedId = 1

        Budget.findAll = jest.fn().mockResolvedValue(budgets.filter(b => b.userId === req.user.id));

        await BudgetController.getAll(req, res);

        expect(res._getJSONData()).toHaveLength(1);

    })
}
)