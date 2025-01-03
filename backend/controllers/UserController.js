import { User } from "../models/User.js";
import bcrypt from 'bcrypt'

export class UserController {
    static async register(req, res) {
        // variables
        const { name, email, password, image, phone, confirmPassword } = req.body

        // validations
        if(!name) return res.status(422).json({ message: 'O nome é obrigatório!' })

        if(!email) return res.status(422).json({ message: 'O email é obrigatório!' })
    
        if(!password) return res.status(422).json({ message: 'A senha é obrigatório!' })

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
            res.status(201).json({ message: 'Usuário criado!', newUser})
            return

        } catch(e) {
            res.status(500).json({ message: e })
        }
    }
}