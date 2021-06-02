import express from 'express';
import {
  createNewApplication,
  getApplicationsByUserId,
} from '../controllers/applicationController.js';

const applicationRouter = express.Router();

//create new application
applicationRouter
  .route('/')
  .post(createNewApplication)
  .get(getApplicationsByUserId);
//get application by id
//edit application by id
//delete application by id
//get all applications with user id

export default applicationRouter;
