import express from 'express'
import authCtrl from '../controllers/auth.controller'
import postCtrl from '../controllers/post.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/feed/:userId')
    .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

router.route('/new/:userId')
    .post(authCtrl.requireSignin, postCtrl.create)

router.route('/photo/:postId')
    .get(postCtrl.photo)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postById)

export default router