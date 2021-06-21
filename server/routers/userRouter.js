import express from 'express';
import {
  registerUser,
  loginUser,
  loginFirebaseUser,
} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.route('/').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/auth_login').post(loginFirebaseUser);
export default userRouter;
