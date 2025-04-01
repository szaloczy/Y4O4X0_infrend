import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

router.post('/user/signup', userController.create);
router.post('/user/login', userController.login);

export default router;