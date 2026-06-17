import express from 'express';
import authController from '../modules/auth/auth.controller.js';
import authRateLimiter from '../middleware/rateLimit.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { 
    loginSchema, 
    registerSchema, 
    googleLoginSchema, 
    forgotPasswordSchema, 
    resetPasswordSchema 
} from '../modules/auth/auth.validation.js';

const router = express.Router();

router.post('/login', authRateLimiter, validate(loginSchema), authController.login);
router.post('/register', authRateLimiter, validate(registerSchema), authController.register);
router.get('/verify-login', authRateLimiter, authController.verifyLogin);
router.post('/google-login', authRateLimiter, validate(googleLoginSchema), authController.googleLogin);
router.post('/forgot-password', authRateLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authRateLimiter, validate(resetPasswordSchema), authController.resetPassword);

export default router;
