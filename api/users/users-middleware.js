
const User = require('./users-model')
const {JWT_SECRET} = require('../secrets')
const jwt = require('jsonwebtoken')
const validateUsername = (req,res,next) => {
    User.getUserByUsername(req.body.username)
    .then((user) => {
        if(!user)
            next()
        else
            res.status(401).json({message:'username is taken'})
    })
}
const validateCredentials = (req,res,next) => {
    if(!req.body.username || !req.body.password)
    {
        res.status(401).json({message:'Invalid credentials: username and password is required'})
    }
    else if (!req.body.email)
    {
        res.status(401).json({message:'Invalid credentials: email is required'})
    }
    else if (!req.body.role)
        {
            res.status(401).json({message:'Invalid credentials: role is required'})
        }
    else
        next()
}
const checkUserExists = (req,res,next) => {
    if(!req.body.username || !req.body.password)
    {
        res.status(401).json({message:'Invalid credentials: username and password is required'})
    }
    else
    {
    User.getUserByUsername(req.body.username)
    .then((user) => {
        if(!user)
        res.status(401).json({message:'user does not exist'})
        else
            next()
    })
}
}
const buildToken = (user) => {
    const payload = {
        subject  : user.user_id ,    
        username : user.user_username,  
        email: user.user_email
    }
    const config = {
        expiresIn: '1h'
      }
      return jwt.sign(payload, JWT_SECRET, config)
}

module.exports = {
    validateCredentials,
    validateUsername,
    buildToken,
    checkUserExists
}