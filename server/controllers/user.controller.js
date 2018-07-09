import User from '../models/user.model'
import _ from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'

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

let update = async(req, res) => {

    try {
        let user = req.profile
        user = _.extend(user, req.body)
        user.updated = Date.now();
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (e) {
        console.log(e)
        return res.status(400).json({error: errorHandler.getErrorMessage(e)})
    }
}


export default {
    create, userByID, read, list, remove, update
}