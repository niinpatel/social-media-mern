import express from 'express';
const router = express.Router()
import userCtrl from '../controllers/user.controller'

router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router