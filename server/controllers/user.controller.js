import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import profileImage from '../../assets/images/profile-pic.png'

let create = async(req, res) => {

    let user = new User(req.body)

    try {
        await user.save()
        return res.json({message: 'Successfully signed up'})

    } catch (e) {
        return res.status(400).json({error: errorHandler.getErrorMessage(e)})
    }

}

let userByID = async(req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if(!user){
            return res.status(400).json({error: 'User not found'})
        }
        else {
            req.profile = user
            next()
        }
    } catch (e) {
        return res.status(400).json({error: errorHandler.getErrorMessage(e)})
    }

}

let read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

let list = async(req, res) => {
    try {
        return res.json(await User.find().select('name email updated created'))

    } catch (e) {
        return res.status(400).json({error: errorHandler.getErrorMessage(e)})
    }

}

let remove = async(req, res) => {
    let user = req.profile
    try {
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        return res.json(deletedUser)
    } catch (e) {
        return res.status(400).json({error: errorHandler.getErrorMessage(e)})
    }

}

let update = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err, fields, files) => {
        if (err) {
          return res.status(400).json({
            error: "Photo could not be uploaded"
          })
        }

        try {
            let user = req.profile
            user = _.extend(user, fields)
            user.updated = Date.now()
            if(files.photo){
                user.photo.data = fs.readFileSync(files.photo.path)
                user.photo.contentType = files.photo.type
            }
            await user.save()
            user.hashed_password = undefined
            user.salt = undefined
            return res.json(user)
        } catch(e) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(e)
            })
        }
    })
}

let photo = (req, res, next) => {
    if(req.profile.photo.data){
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }   
    next()

}

let defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + profileImage)
}

export default {
    create, userByID, read, list, remove, update, photo, defaultPhoto
}