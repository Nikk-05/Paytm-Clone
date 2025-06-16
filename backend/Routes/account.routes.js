import express,{Router} from 'express'
import authUser from '../middlewares/auth.middleware.js'
import { transferMoney } from '../controllers/account.controller.js'

const router = Router()

router.route('/transfer').post(authUser, transferMoney)

export default router 