const hashPassword = require('../helpers/hashPassword')
const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.get('/logIn', (req, res) => {
    res.render('userLogIn')
})

userRouter.post('/logIn', (req, res) => {
    let userData = null
    userController.findByEmail(req.body.email)
    .then(user => {
        if (user) {
            let hashed = hashPassword(req.body.password, user.salt)
            if (hashed === user.password) {
                return user
            }
        } else {
            throw new Error('User not found')
        }
    })
    .then(user => {
        userData = user
        return userController.update({
            status: true
        }, {
            where: {
                id: userData.id
            }
        })
    })
    .then(() => {
        res.render('home', {user:userData})
    })
    .catch(err => {
        res.send(err)
    })
})

userRouter.get('/signUp', (req, res) => {
    // const data = {}
    // const error = req.query.error
    // if(error){
    //     data.err = error
    // }
    // else{
    //     data.err = null
    // }
    // res.render('userSignUp', data)
    res.render('userSignUp')
})
userRouter.post('/signUp', (req, res) => {
    let random = String(Math.random() * 10000)
    userController.create(
        req.body.name,
        req.body.email,
        req.body.password,
        random
    )
    .then(user => {
        if (user) {
            res.render('home', {user})
        }
        else {
            res.status(404).send('Error in inserting new record');
        }
    })
    .catch(err => {
        res.send(err)
    })
})

userRouter.get('/:id/logOut', (req, res) => {
    res.redirect('/')
})

userRouter.post('/:id/logOut', (req, res) => {
    let userId = req.params.id
    userController.update({
        status: false
    }, {
        where: {
            id: userId
        }
    })
    .then(()=> {
        res.redirect('/')
    })
})

module.exports = userRouter