const Model = require('../models')
const StoryTag = Model.StoryTag

class storyTagController {
    static create(StoryId, TagId) {
        return StoryTag.create({
            StoryId: StoryId,
            TagId: TagId
        })
    }
}

module.exports = storyTagController