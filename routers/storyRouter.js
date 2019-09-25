const express = require('express')
const storyRouter = express.Router()
const TagController = require('../controllers/tagController')

storyRouter.get('/', (req, res) => {
    TagController.show()
    .then(arr => {
        res.send(arr)
    })
    .catch(err => res.send(err))
    // res.render('story')
})
storyRouter.get('/add', (req, res) => {
    res.render('addStory')
})
storyRouter.post('/add', (req, res) => {
    res.send(req.body)
})

module.exports = storyRouter