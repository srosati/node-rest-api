import { Router } from 'express';
import { authenticated } from '../../auth/utils.js';
import { create, edit, findById, list, remove } from './controller.js';
import { getTodo, isTodoOwner } from './utils.js';

const router = Router();

// List all TODOs
router.get('/', list);

// Get todo of id id
router.get('/:id', getTodo, findById);

// Create TODO
// Must be authenticated
router.post('/', authenticated, create);

// Edit todo of id id
// Must be authenticated as todo owner
router.put('/:id', isTodoOwner, edit);

// Delete todo of id id
// Must be authenticated as todo owner
router.delete('/:id', isTodoOwner, remove);

export default router;
