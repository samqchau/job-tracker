import express from 'express';
import {
  createNewApplication,
  getApplicationsByUserId,
  updateAppIndices,
  deleteAppById,
  updateAppById,
  toggleFavorited,
  updateFavIndices,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateAppData } from '../middleware/validateAppData.js';

const applicationRouter = express.Router();

// ROUTE (/api/apps)
applicationRouter
  .route('/')
  .get(protect, getApplicationsByUserId)
  .post(protect, createNewApplication)
  .put(protect, validateAppData, updateAppById)
  .delete(protect, deleteAppById);
//get application by id
//edit application by id
//delete application by id
//get all applications with user id

applicationRouter.route('/update/index').put(protect, updateAppIndices);

applicationRouter.route('/update/fav').put(protect, toggleFavorited);

applicationRouter.route('/update/fav_index').put(protect, updateFavIndices);

export default applicationRouter;
