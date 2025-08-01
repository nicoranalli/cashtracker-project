"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("../config/database");
const budgetRoute_1 = __importDefault(require("./budgetRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
const connectDB = async () => {
    try {
        await database_1.sequelize.authenticate();
        console.log('Conexión establecida con la base de datos'.cyan);
        database_1.sequelize.sync();
    }
    catch (error) {
        console.log('Error: ', error);
    }
};
connectDB();
app.get('/', (req, res) => { res.send('Hello from the server'); });
app.use('/budgets', budgetRoute_1.default);
app.use('/auth', authRoute_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map