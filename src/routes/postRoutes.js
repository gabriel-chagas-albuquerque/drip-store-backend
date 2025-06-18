const express = require('express')
const router = express.Router()
const PostController = require('../controllers/postController')

const postController = new PostController()
router.get('/', postController.listar)
router.get('/:id', postController.consultarPorId)
router.post('/', postController.criar)
router.put('/:id', postController.atualizar)
router.delete('/:id', postController.remover)

module.exports = router