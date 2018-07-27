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

router.route('/by/:userId')
    .get(authCtrl.requireSignin, postCtrl.listByUser)

router.route('/api/posts/like')
    .put(authCtrl.requireSignin, postCtrl.like)

router.route('/api/posts/unlike')
    .put(authCtrl.requireSignin, postCtrl.unlike)

router.route('/api/posts/comment')
    .put(authCtrl.requireSignin, postCtrl.comment)

router.route('/api/posts/uncomment')
    .put(authCtrl.requireSignin, postCtrl.uncomment)

router.route('/:postId')
    .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postById)

export default router