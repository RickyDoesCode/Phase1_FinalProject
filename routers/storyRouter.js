const express = require('express')
const storyRouter = express.Router()
const TagController = require('../controllers/tagController')
const StoryController = require('../controllers/storyController')
const UserController = require('../controllers/userController')

storyRouter.get('/', (req, res) => {
    let userData = null
    UserController.show({
        where: {
            status: true
        }
    })
    .then(user => {
        user = user[0]
        userData = user
    })
    .catch(err => res.send(err))

    TagController.showWithStories()
    .then(tags => {
        if (userData === {}){
            user = null
        }
        res.render('story', { tags, user : userData })
    })
    .catch(err => res.send(err))
})

storyRouter.get('/:storyId', (req, res) => {
    let userData = null
    UserController.show({
        where: {
            status: true
        }
    })
    .then(user => {
        user = user[0]
        userData = user
    })
    .catch(err => res.send(err))

    StoryController.findById(req.params.storyId)
    .then(story => {
        story = story[0]
        res.render('showStory', { story, user : userData })
    })
    .catch(err => res.send(err))
})

module.exports = storyRouter