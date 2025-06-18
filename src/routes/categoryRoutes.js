const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController')

const categoryController = new CategoryController()

router.get('/search', categoryController.search)
router.get('/:id',categoryController.consultForId)
router.post('/', categoryController.register)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router