import express from 'express';
import { UserController} from '../controllers/UserController.js'
export const router = express.Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)