import express from 'express';
import {
  createNewApplication,
  getApplicationsByUserId,
  updateAppIndices,
  deleteAppById,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const applicationRouter = express.Router();

// ROUTE (/api/apps)
applicationRouter
  .route('/')
  .post(protect, createNewApplication)
  .get(protect, getApplicationsByUserId)
  .delete(protect, deleteAppById);
//get application by id
//edit application by id
//delete application by id
//get all applications with user id

applicationRouter.route('/update/index').put(protect, updateAppIndices);

export default applicationRouter;
