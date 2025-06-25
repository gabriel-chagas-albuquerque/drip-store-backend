const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

const productController = new ProductController()

router.get('/search',productController.search)
router.get('/:id',productController.consultForId)
router.post('/', authMiddleware, productController.register)
router.put('/:id', authMiddleware, productController.update)
router.delete('/:id', authMiddleware, productController.delete)

module.exports = router