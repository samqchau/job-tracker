import {
  updateNoteById,
  deleteNoteById,
} from '../controllers/noteController.js';

import express from 'express';

const noteRouter = express.Router();

noteRouter
  .route('/:id')
  .put(protect, updateNoteById)
  .delete(protect, deleteNoteById);

export default noteRouter;
