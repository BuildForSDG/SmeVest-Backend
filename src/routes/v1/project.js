import { Router } from 'express';
import { projectController } from '../../controllers';
import { authMiddleWare } from '../../middlewares';
import validators from '../../validators';

const projectRouter = new Router();

/** Route for projects  */
projectRouter.patch('/update/:projectId', authMiddleWare, validators.createProjectValidator, projectController.updateProject);
projectRouter.get('/get/:projectId', authMiddleWare, projectController.getProject);
projectRouter.post('/create', authMiddleWare, validators.createProjectValidator, projectController.createProject);
projectRouter.get('/get/active', authMiddleWare, projectController.getAllActiveProjects);
projectRouter.get('/get/given', authMiddleWare, projectController.getAllGivenProjects);


export default projectRouter;
