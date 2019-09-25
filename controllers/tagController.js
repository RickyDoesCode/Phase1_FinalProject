const Model = require('../models')
const Tag = Model.Tag

class TagController {
    static show(obj = {}) {
        return Tag.findAll(obj)
    }
    static showWithStories() {
        return this.show({
            include: [Model.Story]
        })
    }
    static filterByTag(Tag) {
        let filteredStories = []
        return this.showWithStories()
        .then(tags => {
            tags.forEach(tag => {
                if (tag.name.toLowerCase() === Tag.toLowerCase()) {
                    let storiesArr = tag.Stories
                    storiesArr.forEach(story => {
                        filteredStories.push(story)
                    })
                }
            })
        })
    }
    static filterByUserId(id) {
        let filteredStories = []
        return this.showWithStories()
        .then(tags => {
            tags.forEach(tag => {
                let storiesArr = tag.Stories
                storiesArr.forEach(story => {
                    if (story.UserId === id) {
                        filteredStories.push(story)
                    }
                })
            })
        })
    }

    static findByTagName(TagName) {
        return this.show({
            where: {
                name: TagName
            }
        })
        .then(tag => {
            return tag[0]
        })
    }
}

module.exports = TagController