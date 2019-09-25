const Model = require('../models')
const Tag = Model.Tag

class TagController {
    static show() {
        return Tag.findAll()
    }
}

module.exports = TagController