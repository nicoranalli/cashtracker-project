import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs:  60 * 1000, // 1 minute
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: {error:'Too many requests from this IP, please try again after a minute'}
})
