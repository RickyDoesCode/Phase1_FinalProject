const express = require('express')
const postRouter = express.Router()
const UserController = require('../controllers/userController')
const PostController = require('../controllers/postController')
const TagController = require('../controllers/tagController')
const StoryController = require('../controllers/storyController')
const StoryTagController = require('../controllers/storyTagController')

postRouter.get('/:id', (req, res) => {
  PostController.findById(req.params.id)
  .then(posts => {
      if (req.session.user) {
          res.render('post', {posts, user : req.session.user })
        } else {
          res.redirect('/')
        }
    })
    .catch(err => res.send(err))
})

postRouter.get('/:id/add', (req, res) => {
  TagController.show()
  .then(tags => {
    if (req.session.user) {
      res.render('addStory', {id: req.params.id, user: req.session.user, tags})
    } else {
      res.render('addStory', {id: req.params.id, user: null, tags})
    }
    })
})

postRouter.post('/:id/add', (req, res) => {
  PostController.add(req.body.posted, req.params.id)
  .then(() => console.log('success'))
  .catch(err => res.send(err))
  let arrayOfChosenTags = []
  for (let keyName in req.body) {
    if (keyName !== 'content' && req.body[keyName] === 'on') {
      arrayOfChosenTags.push(keyName)
    }
  }
  let storyId = null
  let tagId = null
  arrayOfChosenTags.forEach(tagName => {
    StoryController.findByUserId(req.params.id)
    .then(story => {
      let id = story[story.length - 1].id + 1
      storyId = id
    })
    .catch(err => res.send(err))
    TagController.findByTagName(tagName)
    .then(tag => {
      tagId = tag.id
    })
    .then(() => {
      return StoryTagController.create(storyId, tagId)
    })
    .catch(err => res.send(err))
  })
  res.redirect(`/story/posts/${req.params.id}`)
})

postRouter.get('/:id/edit/:storyId', (req,res) =>{
  PostController.findOne(req.params.storyId)
  .then(story => {
    if (req.session.user && req.session.user.id === req.params.id) {
      res.render('editStory', {story, user: req.session.user})
    } else {
      res.render('editStory', {story, user: null})
    }
  })
})

postRouter.post('/:id/edit/:storyId', (req,res) => {
  PostController.update(req.params.storyId, req.body.posted)
  .then(()=>{
    res.redirect(`/story/posts/${req.params.id}`)
  })
})

postRouter.get('/:id/delete/:storyId', (req,res) => {
  PostController.delete(req.params.storyId)
    .then(()=> {
      res.redirect(`/story/posts/${req.params.id}`)
    })
})

module.exports = postRouter