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
            if (count === 5) {
                let userData = null
                UserController.show({
                    where: {
                        status: true
                    }
                })
                .then(user => {
                    user = user[0]
                    user ? userData=user : ''
                })
                .catch(err => {throw new Error(err)})
                res.render('storyFiltered', { stories, stories: temp, user : userData })
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