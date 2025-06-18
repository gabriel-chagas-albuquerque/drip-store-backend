const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    return next()
    const token = req.headers['authorization']

    if (!token) {
        res.status(403).json({message:'Token não fornecido'})
    } 

    try {
        const decoded = jwt.verify(token, process.env.APP_KEY_TOKEN)
        req.usuarioId = decoded.id
        next()
    } catch(err) {
        res.status(403).json({message:'Token inválido'})
    }
}

module.exports = authMiddleware