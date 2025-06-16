import express, {Router} from 'express'
import { userSignIn, userSignUp, usersList, userUpdate } from '../controllers/user.controller.js'
import { getBalance } from '../controllers/account.controller.js'
import authUser from '../middlewares/auth.middleware.js'

const router = Router()

router.post("/signup",userSignUp)
router.post('/signin',userSignIn)
router.route('/').put(authUser,userUpdate)
router.route('/bulk').get(authUser,usersList)
router.route('/balance').get(authUser,getBalance)


export default router

