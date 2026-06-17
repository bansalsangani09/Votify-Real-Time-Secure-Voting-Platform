import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validateElectionSecurity } from '../middleware/security.middleware.js';
import blockchainGuard from '../middleware/blockchainGuard.middleware.js';
import electionController from '../modules/election/election.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { 
    createElectionSchema, 
    updateElectionSchema, 
    joinElectionSchema, 
    addAdminSchema, 
    inviteVoterSchema, 
    candidateSchema 
} from '../modules/election/election.validation.js';

import electionAdminController from '../modules/election/election.admin.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

// User & Basic Admin Routes
router.post('/', protect, validate(createElectionSchema), validateElectionSecurity, blockchainGuard, electionController.createElection);
router.get('/', protect, admin, electionController.getAllElections);
router.post('/upload', protect, upload.single('image'), electionController.uploadImage);
router.post('/join', protect, validate(joinElectionSchema), electionController.joinElection);

router.get('/my', protect, electionController.getMyElections);
router.post('/rejoin/:id', protect, electionController.rejoinElection);
router.post('/:id/leave', protect, electionController.leaveElection);
router.get('/:id', protect, electionController.getElectionById);
router.patch('/:id/integrate', protect, admin, electionController.integrateElection);
router.patch('/:id', protect, validate(updateElectionSchema), electionController.updateElection);
router.post('/:id/candidates', protect, upload.single('image'), validate(candidateSchema), electionController.addCandidate);
router.put('/:id/candidates/:candidateId', protect, upload.single('image'), validate(candidateSchema), electionController.updateCandidate);
router.delete('/:id/candidates/:candidateId', protect, electionController.removeCandidate);
router.delete('/:id/participants/:userId', protect, electionController.removeParticipant);
router.delete('/:id', protect, electionController.deleteElection);
router.post('/:id/add-owner', protect, validate(addAdminSchema), electionController.addAdmin);
router.post('/:id/invite-voter', protect, validate(inviteVoterSchema), electionController.inviteVoter);

// Advanced Admin (Election Wizard)
router.post('/draft', protect, admin, validate(createElectionSchema), electionAdminController.createDraft);
// Note: Candidates in wizard also use the same candidateSchema
router.post('/:id/candidates', protect, admin, upload.single('image'), validate(candidateSchema), electionAdminController.addCandidate);
router.put('/:id/candidates/:candidateId', protect, admin, upload.single('image'), validate(candidateSchema), electionAdminController.updateCandidate);
router.delete('/:id/candidates/:candidateId', protect, admin, electionAdminController.removeCandidate);
router.put('/:id/publish', protect, admin, electionAdminController.publishElection);
router.patch('/:id/status', protect, admin, electionAdminController.updateStatus);
router.delete('/:id', protect, admin, electionAdminController.deleteElection);

export default router;
