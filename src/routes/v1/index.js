import { Router } from 'express';
import authRouter from './auth';
import profileRouter from './profile';
import smeRouter from './sme';
import investorRouter from './investor';
import { cloudinaryConfig } from '../../config/cloudinary_config';
import connectionRouter from './connection';
import projectRouter from './project';


const v1Router = new Router();

v1Router.use('*', cloudinaryConfig);
v1Router.use('/auth', authRouter);
v1Router.use('/profile', profileRouter);
v1Router.use('/sme', smeRouter);
v1Router.use('/investor', investorRouter);
v1Router.use('/connection', connectionRouter);
v1Router.use('/project', projectRouter);


export default v1Router;
