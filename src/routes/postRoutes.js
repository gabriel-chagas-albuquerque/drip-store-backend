const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')

const postController = new PostController()
router.get('/', postController.listar)
router.get('/:id', postController.consultarPorId)
router.post('/', authMiddleware, postController.criar)
router.put('/:id', authMiddleware, postController.atualizar)
router.delete('/:id', authMiddleware, postController.remover)

module.exports = router