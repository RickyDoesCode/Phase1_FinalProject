const express = require('express')
const homeRouter = express.Router()
const UserController = require('../controllers/userController')

homeRouter.get('/', (req, res) => {
    UserController.findOnline()
    .then(user => {
        if (user) {
            req.session.user = user
            res.render('home', { user : req.session.user })
        } else {
            res.render('home', {user : null})
        }
    })
})

module.exports = homeRouter