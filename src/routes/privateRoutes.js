const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const userRoutes = require('./userRoutes')
const categoryRoutes = require('./categoryRoutes')
const productRoutes = require('./productRoutes')

//Middleware de autenticação
router.use(authMiddleware)

//Rotas Privadas
router.use('/user', userRoutes)
router.use('/category', categoryRoutes)
router.use('/product', productRoutes)


module.exports = router