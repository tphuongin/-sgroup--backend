import express from 'express'
import * as userController from '../controller/user.controller.js'
import ValidateUser from '../middlewares/validateUser.middleware.js'

const router = express.Router()
const validateUser = new ValidateUser();
router.get('/', userController.getAllUsers)
router.get('/:id',validateUser.validateID, userController.getUserById)
router.post('/',validateUser.validateInfor ,userController.createUser)
router.put('/:id',validateUser.validateID, validateUser.isUserExists,userController.updateUser)
router.delete('/:id',validateUser.validateID, validateUser.isUserExists, userController.deleteUser)

export default router