const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

const userController = new UserController()

router.get('/:id', userController.consultForId)
router.post('/',userController.register)
router.put('/:id',userController.update)
router.delete('/:id', userController.delete)


module.exports = router