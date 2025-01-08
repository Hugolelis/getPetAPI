import jwt from 'jsonwebtoken'

export const createUserToken = async(user, req, res) => {
    // create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "secretabc123")

    // return token
    res.status(200).json({ message: "Você está autenticado!", token, userId: user._id })
}