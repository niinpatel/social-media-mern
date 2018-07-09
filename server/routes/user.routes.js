import express from 'express';
const router = express.Router()
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router