import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../../config/config'
import errorHandler from "../helpers/dbErrorHandler";

let signin = async(req, res) => {

    try{
        let user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(401).json({error: 'User not found'})
        }
        if(!user.authenticate(req.body.password)){
            return res.status(401).json({error:'Email and Password doesn\'t match'})
        }
        let token = jwt.sign({
            _id: user._id

        }, config.jwtSecret)

        res.cookie("t", token, {
            expire: new Date() + 9999
        })
        return res.json({
            token,
            user: {_id: user._id, name: user.name, email:user.email}
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({error: errorHandler.getErrorMessage(e)})
    }
}

let signout = (req, res) => {
    res.clearCookie("t")
    return res.json({message: 'Signed out'})
}

let requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})

let hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.status(403).json({error: 'User not authorized'})
    }
    next()
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}