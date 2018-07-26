import Post from "../models/post.model";
import formidable from 'formidable'
import fs from 'fs'

let listNewsFeed = async (req, res) => {
    try {
        let following = req.profile.following
        following.push(req.profile._id)
        let posts = await Post.find({ postedBy: { $in: following } })
            .populate('comments', 'text created')
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        return res.json(posts)
    } catch (e) {        
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }

}

let create = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }

        try {
            let post = new Post(fields)
            post.postedBy = req.profile
            if (files.photo) {
                post.photo.data = fs.readFileSync(files.photo.path)
                post.photo.contentType = files.photo.type
            }
            let result = await post.save()
            res.json(result)
        } catch (e) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}


let postById = async (req, res, next, id) => {
    try {
        let post = await Post.findById(id)
            .populate('postedBy', '_id name')
            .exec()
        if(!post)
            return res.status(400).json({
                error: 'Post Not Found'
            })
        req.post = post
        next()
    } catch (e) {
        return res.status(400).json({
            error: 'Post Not Found'
        })
    }

}

let photo = async(req, res) => {
    let post = await Post.findById(req.post)
    res.set('Content-Type', req.post.photo.contentType)
    res.send(post.photo.data)
}

export default {
    listNewsFeed, create, postById, photo
}