import express from 'express';
import { UserController} from '../controllers/UserController.js'
export const router = express.Router();

// middlewate
import { checkToken as verifyToken } from '../helpers/verify-token.js';
import { imageUpload } from '../helpers/image-upload.js';

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single("image"), UserController.editUser)