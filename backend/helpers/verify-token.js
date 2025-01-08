import jwt from 'jsonwebtoken'
import { getToken } from './get-token.js'

export const checkToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).json({ message: 'Acesso negado!' })

    const token = getToken(req)
    if(!token) return res.status(401).json({ message: 'Acesso negado!' })

    try{

        const verified = jwt.verify(token, 'secretabc123')
        req.user = verified
        next()

    } catch(e) {
        return res.status(400).json({ message: 'Token inválido!' })
    }
}