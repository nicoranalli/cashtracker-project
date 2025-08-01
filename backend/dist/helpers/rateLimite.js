"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: { error: 'Too many requests from this IP, please try again after a minute' }
});
//# sourceMappingURL=rateLimite.js.map