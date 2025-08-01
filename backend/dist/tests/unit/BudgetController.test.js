"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = require("node-mocks-http");
const budget_1 = require("../mocks/budget");
const budgetsController_1 = require("../../controllers/budgetsController");
const Budget_1 = __importDefault(require("../../models/Budget"));
jest.mock('../../models/Budget', () => {
    return {
        findAll: jest.fn()
    };
}); // This will replace the Budget model with a mock that returns the budgets array
describe('BudgetController.getAll', () => {
    it('should return 2 budgets for userId ', async () => {
        const req = (0, node_mocks_http_1.createRequest)({
            method: 'GET',
            url: '/budgets',
            user: { id: 2 }
        });
        const res = (0, node_mocks_http_1.createResponse)();
        // This will call the mocked findAll function with filter usedId = 1
        Budget_1.default.findAll = jest.fn().mockResolvedValue(budget_1.budgets.filter(b => b.userId === req.user.id));
        await budgetsController_1.BudgetController.getAll(req, res);
        expect(res._getJSONData()).toHaveLength(1);
    });
});
//# sourceMappingURL=BudgetController.test.js.map