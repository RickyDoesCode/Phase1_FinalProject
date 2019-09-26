const express = require('express')
const storyRouter = express.Router()
const TagController = require('../controllers/tagController')
const StoryController = require('../controllers/storyController')
const UserController = require('../controllers/userController')

storyRouter.get('/', (req, res) => {
    TagController.showWithStories()
    .then(tags => {
        StoryController.showWithTags()
        .then(stories => {
            if (req.session.user) {
                res.render('story', { stories, tags, user : req.session.user})
            } else {
                res.render('story', { stories, tags, user : null })
            }
        })
        .catch(err => res.send(err))
    })
})

storyRouter.get('/filter', (req, res) => {})

storyRouter.post('/filter', (req, res) => {
    let arrOfTags = []
    for (let tagName in req.body) {
        if (req.body[tagName] === 'on') {
            arrOfTags.push({name: tagName})
        }
    }
    let temp = []
    arrOfTags.forEach((tag) => {
        let name = tag.name
        let count = 0
        StoryController.showWithTags(arrOfTags)
        .then((stories) => {
            stories.forEach((story) => {
                story.Tags.forEach(tag => {
                    if (tag.name === name && temp.indexOf(story) === -1) {
                        temp.push(story)
                    }
                    count++
                })
            })
            if (count === 7) {
                if (req.session.user) {
                    res.render('storyFiltered', { stories: temp, user : req.session.user })
                } else {
                    res.render('storyFiltered', { stories: temp, user : null })
                }
            }
        })
        .catch(err => res.send(err))
    })
})

storyRouter.get('/:storyId', (req, res) => {
    StoryController.findById(req.params.storyId)
    .then(story => {
        story = story[0]
        if (req.session.user) {
            res.render('showStory', { story, user : req.session.user })
        } else {
            res.render('showStory', { story, user : null })
        }
    })
    .catch(err => res.send(err))
})

module.exports = storyRouter