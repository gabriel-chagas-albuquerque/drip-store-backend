const jwt = require('jsonwebtoken')

const usuarios = [
    {
        id:1,
        nome: 'Admin',
        login:"admin",
        senha:"123456"
    },

    {
        id:2,
        nome:"User",
        login:"user",
        senha:'123456'
    }
]

exports.login = (req, res) => {
    const {login, senha} = req.body
    const usuario = usuarios.find(user => user.login === login && user.senha === senha)

    if(usuario) {
        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome
        }, process.env.APP_KEY_TOKEN, {expiresIn: '1h'})
        res.json({ token })
    } else {
        res.status(401).json({message:'Login ou senha incorretos'})
    }
}