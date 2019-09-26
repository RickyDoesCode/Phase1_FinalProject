const hashPassword = require('../helpers/hashPassword')
const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.get('/logIn', (req, res) => {
    res.render('userLogIn')
})

userRouter.post('/logIn', (req, res) => {
    userController.findByEmail(req.body.email)
    .then(user => {
        if (user) {
            let hashed = hashPassword(req.body.password, user.salt)
            if (hashed === user.password) {
                req.session.user = user
            }
        } else {
            throw new Error('User not found')
        }
    })
    .then(() => {
        return userController.update({
            status: true
        }, {
            where: {
                id: req.session.user.id
            }
        })
    })
    .then(() => {
        res.render('home', {user:req.session.user})
    })
    .catch(err => {
        res.send(err)
    })
})

userRouter.get('/signUp', (req, res) => {
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
            req.session.user = user
            res.render('home', { user: req.session.user })
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
    if (!req.session.user) {
        res.redirect('/')
    }
})

userRouter.post('/:id/logOut', (req, res) => {
    userController.update({
        status: false
    }, {
        where: {
            id: req.session.user.id
        }
    })
    .then(()=> {
        req.session.destroy(() => {
            res.redirect('/')
        })
    })
})

module.exports = userRouter