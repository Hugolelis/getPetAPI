import jwt from 'jsonwebtoken'

export const createUserToken =  async(user, req, res) => {
    // create totken
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "secretabc123")

    // return toklen
    res.status(200).json({ message: "Você está autenticado!", token, userId: user._id })
}