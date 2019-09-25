const express = require('express')
const postRouter = express.Router()
const TagController = require('../controllers/tagController')
const PostController = require('../controllers/postController')

postRouter.get('/:id', (req, res) => {
    PostController.findById(req.params.id)
    .then(posts => {
        // res.render('post', {posts})
        res.send(posts)
    })
    .catch(err => res.send(err))
    // res.render('story')
})

postRouter.get('/:id/add', (req, res) => {
    res.render('addStory', {id: req.params.id})
})

postRouter.post('/:id/add', (req, res) => {
    PostController.add(req.body.posted, req.params.id)
    .then(()=> {
      res.redirect(`/post/${req.params.id}`)
    })
})

postRouter.get('/:id/edit/:storyId', (req,res) =>{
  PostController.findOne(req.params.storyId)
  .then(story => {
    res.render('editStory', {story})
  })
})

postRouter.post('/:id/edit/:storyId', (req,res) => {
  PostController.update(req.params.storyId, req.body.posted)
  .then(()=>{
    res.redirect(`/post/${req.params.id}`)
  })
})

postRouter.get('/:id/delete/:storyId', (req,res) => {
    PostController.delete(req.params.storyId)
    .then(()=> {
      res.redirect(`/post/${req.params.id}`)
    })
})

module.exports = postRouter


