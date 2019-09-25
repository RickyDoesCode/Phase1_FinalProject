const express = require('express')
const homeRouter = express.Router()
const UserController = require('../controllers/userController')

homeRouter.get('/', (req, res) => {
    UserController.findOnline()
    .then(user => {
        if (user.length === 0) {
            user = null
        } else {
            user = user[0]
        }
        res.render('home', { user })
    })
})

module.exports = homeRouter