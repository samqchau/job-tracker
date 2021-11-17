import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import applicationRouter from './routers/applicationRouter.js';
import userRouter from './routers/userRouter.js';
import noteRouter from './routers/noteRouter.js';
import { errorHandler } from './middleware/errorHandlers.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.use('/api/apps', applicationRouter);
app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});
