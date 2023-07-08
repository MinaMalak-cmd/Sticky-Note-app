import {Router} from 'express';
import * as userController from './controllers/user.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/signup', userController.addUser);
router.post('/login', userController.login);
router.put('/update/:id', userController.updateUser);

export default router;