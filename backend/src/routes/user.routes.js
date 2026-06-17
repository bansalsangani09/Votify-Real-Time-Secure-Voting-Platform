import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import userController from '../modules/user/user.controller.js';
import upload from '../middleware/upload.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { 
    updateProfileSchema, 
    changePasswordSchema, 
    updateNotificationsSchema, 
    updateElectionNotificationSchema 
} from '../modules/user/user.validation.js';

const router = express.Router();

// Admin Routes
router.get('/voters', protect, admin, userController.getVoters);
router.delete('/voters/:id', protect, admin, userController.removeVoter);

// User Profile & Settings Routes
router.get('/me', protect, userController.getMe);
router.put('/profile', protect, upload.single('avatar'), validate(updateProfileSchema), userController.updateProfile);
router.put('/password', protect, validate(changePasswordSchema), userController.changePassword);
router.put('/notifications', protect, validate(updateNotificationsSchema), userController.updateNotifications);
router.put('/notifications/election/:electionId', protect, validate(updateElectionNotificationSchema), userController.updateElectionNotification);

export default router;
