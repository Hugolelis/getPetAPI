import express from 'express'
import { PetController } from '../controllers/PetController.js'
export const router = express.Router()

// middlewares
import { checkToken } from "../helpers/verify-token.js";
import { imageUpload } from "../helpers/image-upload.js"

router.post('/create', checkToken, imageUpload.array('images'), PetController.create)