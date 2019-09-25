const Model = require('../models')
const Story = Model.Story
const Tag = Model.Tag

class StoryController {
    static show(obj = {}) {
        return Story.findAll(obj)
    }
    static showWithTags() {
        return this.show({
            include: [Tag]
        })
    }
    static findByTags(arrayTags) {
        this.showWithTags()
        .then(stories => {
            return arrayTags
        })
    }
    static findById(id) {
        return this.show({
            where: {
                id: id
            }
        })
    }
    static findByUserId(UserId) {
        return this.show({
            where: {
                UserId: UserId
            }
        })
    }
}

module.exports = StoryController