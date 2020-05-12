import express from 'express';
import registerUser from '../../controllers';
import registerValidator from '../../validators';

const authRouter = express.Router();

authRouter.post('/signup', registerValidator, registerUser);

export default authRouter;
