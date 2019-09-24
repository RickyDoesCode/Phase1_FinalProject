const express = require('express')
const storyRouter = express.Router()

storyRouter.get('/', (req, res) => {
    res.render('story')
})

module.exports = storyRouter