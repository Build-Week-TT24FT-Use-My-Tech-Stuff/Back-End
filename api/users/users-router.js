const router = require('express').Router()
const userMiddleware = require('./users-middleware');
const User = require('./users-model')
const bcryptjs = require("bcryptjs");


router.post("/signup", userMiddleware.validateCredentials , userMiddleware.validateUsername,(req, res, next) => {
    const {username, password} = req.body
     const hash = bcryptjs.hashSync(password, 8)
    const hashedUser = {
        user_username:username,
         user_role: req.body.role,
         user_password: hash,
         user_email:req.body.email
    }
    User.addUser(hashedUser)
    .then((user) => {
      res.status(201).json(user[0])
    })
    .catch(next)
  });
router.post('/login', userMiddleware.checkUserExists, (req,res,next) => {
    const {username, password} = req.body
    User.getUserByUsername(username)
    .then((user) => {
        if(bcryptjs.compareSync(password, user.user_password))
        {const token = userMiddleware.buildToken(user)
        res.json({user_role:user.user_role, token})
        }
        else
        {
          res.status(401).json({ message: "Invalid credentials:password is incorrect" });
        }
    })
    .catch(next)
})




module.exports = router