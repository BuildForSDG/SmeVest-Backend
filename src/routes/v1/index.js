import { Router } from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import { cloudinaryConfig } from '../../config/cloudinary_config';


const v1Router = new Router();

v1Router.use('*', cloudinaryConfig);
v1Router.use('/auth', authRouter);
v1Router.use('/profile', profileRouter);

export default v1Router;
