import jwt from 'jsonwebtoken'

import { User } from '../models/User.js'

export const getUserByToken = async(token, req, res) => {
    if(!token) return res.status(401).json({ message: 'Acesso negado!' })

    const decoded = jwt.verify(token, 'secretabc123')

    const userId = decoded.id

    const user = await User.findOne({ _id: userId })

    return user
}
