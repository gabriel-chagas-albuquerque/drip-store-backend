const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/authMiddleware')

const categoryController = new CategoryController()

router.get('/search', categoryController.search)
router.get('/:id',categoryController.consultForId)
router.post('/', authMiddleware, categoryController.register)
router.put('/:id', authMiddleware, categoryController.update)
router.delete('/:id', authMiddleware, categoryController.delete)

module.exports = router