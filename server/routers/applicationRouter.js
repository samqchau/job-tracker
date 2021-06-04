import express from 'express';
import {
  createNewApplication,
  getApplicationsByUserId,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const applicationRouter = express.Router();

//create new application
applicationRouter
  .route('/')
  .post(protect, createNewApplication)
  .get(protect, getApplicationsByUserId);
//get application by id
//edit application by id
//delete application by id
//get all applications with user id

export default applicationRouter;
