import express from 'express'
import { PetController } from '../controllers/PetController.js'
export const router = express.Router()

// middlewares
import { checkToken as verifyToken } from "../helpers/verify-token.js";
import { imageUpload } from "../helpers/image-upload.js"

router.get('/', PetController.getAll)
router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
router.get('/mypets', verifyToken, PetController.gettAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetByID)
router.delete('/:id', verifyToken, PetController.removePetByID)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)
router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)
