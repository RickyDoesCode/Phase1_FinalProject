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
        tagsData = tags
    })

    StoryController.showWithTags()
    .then(stories => {
        if (userData === {}){
            user = null
        }
        res.render('story', { stories, tags: tagsData, user : userData })
    })
    .catch(err => res.send(err))
})

storyRouter.get('/filter', (req, res) => {})

storyRouter.post('/filter', (req, res) => {
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


    let arrOfTags = []
    for (let tagName in req.body) {
        if (req.body[tagName] === 'on') {
            arrOfTags.push({name: tagName})
        }
    }
    let i = 1
    let temp = []
    arrOfTags.forEach(tag => {
        let name = tag.name
        StoryController.showWithTags(arrOfTags)
        .then(stories => {
            stories.forEach(story => {
                story.Tags.forEach(tag => {
                    if (tag.name === name && temp.indexOf(story) === -1) {
                        temp.push(story.dataValues)
                    }
                })
            })
            i++
            if (i === stories.length + 1) {
                if (userData === {}){
                    user = null
                }
                res.render('storyFiltered', { stories, tags: temp, user : userData })
            }
        })
        .catch(err => res.send(err))
    })
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