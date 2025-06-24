const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

const productController = new ProductController()

router.get('/search',productController.search)
router.get('/:id',productController.consultForId)
router.post('/', productController.register)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)

module.exports = router