import { Router } from 'express';
import { create, edit, findById, list, remove } from './controller.js';
import { isSameUser, parseId } from './utils.js';

const router = Router();

// List all users
router.get('/', list);

// Get user of id id
router.get('/:id', parseId, findById);

// Create user
router.post('/', create);

// Edit user of id id
// Must be authenitcated as that user
router.put('/:id', isSameUser, edit);

// Delete user of id id
// Must be authenticated as that user
router.delete('/:id', isSameUser, remove);

export default router;
