const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const userController = new UserController()

router.post('/', userController.register)
router.post('/token', userController.tokenGenerate)
router.get('/:id', userController.consultForId)
  
router.put('/:id', authMiddleware, userController.update) 
router.delete('/:id', authMiddleware, userController.delete) 

module.exports = router