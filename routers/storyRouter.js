const express = require('express')
const storyRouter = express.Router()
const StoryController= require('../controllers/storyController')
const TagController = require('../controllers/tagController')

storyRouter.get('/', (req, res) => {
    TagController.showWithStories()
    .then(tags => {
        res.render('story', {tags})
    })
    .catch(err => res.send(err))
})

module.exports = storyRouter