const Model = require('../models')
const Story = Model.Story

class PostController {
    static findById(id) {
        return Story.findAll({
          where: {
            UserId: id
          },
          include: [Model.Tag]
        })
    }

    static add(body, id){
      return Story.create({
        content: body,
        UserId: id,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    static findOne(id){
      return Story.findOne({
        where:{
          id: id
        }
      })
    }

    static update(id, content){
      return Story.update({
        content: content
      }, {
        where: {
          id: id
        }
      })
    }

    static delete(id){
      return Story.destroy({
        where: {
          id: id
        }
      })
    }

    // find stories by id
}

module.exports = PostController