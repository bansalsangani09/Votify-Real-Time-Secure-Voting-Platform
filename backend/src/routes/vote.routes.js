import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import blockchainGuard from '../middleware/blockchainGuard.middleware.js';
import voteController from '../modules/vote/vote.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { voteSchema } from '../modules/vote/vote.validation.js';

const router = express.Router();

// @route   POST /api/votes
// @access  Private (User)
router.post('/', protect, blockchainGuard, validate(voteSchema), voteController.castVote);

export default router;
