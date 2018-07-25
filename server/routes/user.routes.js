import express from 'express';
const router = express.Router()
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

router.route('/defaultphoto')
    .get(userCtrl.defaultPhoto)

router.route('/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto)

router.route('/follow')
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.addFollowing, userCtrl.addFollower)

router.route('/unfollow')
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/findpeople/:userId')
    .get(authCtrl.requireSignin, userCtrl.findPeople)

router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router