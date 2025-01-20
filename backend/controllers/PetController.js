import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";
import { Pet } from "../models/Pet.js";
import { isValidObjectId } from "mongoose";

export class PetController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body
        const available = true

        // images upload
        const images = req.files

        // validations
        if(!name) return res.status(422).json({ message: 'O nome é obrigatório!' })
        if(!age) return res.status(422).json({ message: 'A idade é obrigatória!' })
        if(!weight) return res.status(422).json({ message: 'O peso é obrigatório!' })
        if(!color) return res.status(422).json({ message: 'A cor é obrigatória' })
        if(images.lenght === 0) return res.status(422).json({ message: 'A imagem é obrigatória' })

        // get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        // create pet
        const pet = new Pet({ name, age, weight, color, available, images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {

            const newPet = await pet.save()
            res.status(201).json({ message: 'Pet cadastrado com sucesso!', newPet })

        } catch(e) {
            res.status(500).json({ message: e })
        }
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({ pets })
    }

    static async gettAllUserPets(req, res) {
        // get user
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        res.status(200).json({ pets })
    }

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        res.status(200).json({ pets })
    }

    static async getPetByID(req, res) {
        const { id } = req.params

        if(!isValidObjectId(id)) return res.status(422).json({ message: 'ID  inválido!' })
        
        const pet = await Pet.findOne({_id: id})

        if(!pet) return res.status(404).json({ message: 'Pet não encontrado!' })

        res.status(200).json({ pet })
    }
}