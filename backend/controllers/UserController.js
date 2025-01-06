import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// helpers
import { createUserToken } from "../helpers/create-user-token.js";
import { getToken } from "../helpers/get-token.js";

export class UserController {
    static async register(req, res) {
        // variables
        const { name, email, password, image, phone, confirmPassword } = req.body

        // validations
        if(!name) return res.status(422).json({ message: 'O nome é obrigatório!' })

        if(!email) return res.status(422).json({ message: 'O email é obrigatório!' })
    
        if(!password) return res.status(422).json({ message: 'A senha é obrigatória!' })

        if(!confirmPassword) return res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })

        if(confirmPassword !== password) res.status(422).json({ message: 'A senha e confimação de senha precisam ser iguais!' })

        if(!phone) return res.status(422).json({ message: 'O telefone é obrigatório!' })

        // check if user exist
        const userExist = await User.findOne({ email: email })

        if(userExist) return res.status(422).json({ message: 'O email ja está cadastrado!' })

        // hash password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try{
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
            return
        } catch(e) {
            res.status(500).json({ message: e })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if(!email) return res.status(422).json({ message: 'O email é obrigatório!' })
        if(!password) return res.status(422).json({ message: 'A senha é obrigatória!' })
        
        // check if email exist
        const user = await User.findOne({ email: email })

        if(!user) return res.status(422).json({ message: 'O email não está cadastrado!' })

        // check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) return res.status(422).json({ message: 'A senha está incorreta!' })

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser 

        if(req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secretabc123')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }
        
        res.status(200).send(currentUser)
    }
}