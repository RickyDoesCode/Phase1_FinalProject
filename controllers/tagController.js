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
        .then(arr => {
            arr.forEach(tag => {
                if (tag.name.toLowerCase() === Tag.toLowerCase()) {
                    filteredStories.push(tag)
                }
            })
        })
    }
}

module.exports = TagController