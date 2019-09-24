const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/logIn', (req, res) => {
    res.render('userLogIn')
})
homeRouter.get('/signUp', (req, res) => {
    res.render('userSignUp')
})

module.exports = homeRouter