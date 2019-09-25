const Model = require('../models')
const Story = Model.Story

class StoryController {
    static findById(id) {
        return Story.findAll({
            where: {
                id: id
            }
        })
    }
}

module.exports = StoryController