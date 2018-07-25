import express from 'express';
const router = express.Router()
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

router.route('/defaultphoto')
    .get(userCtrl.defaultPhoto)

router.route('/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto)

router.route('/follow')
    .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)

router.route('/unfollow')
    .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router