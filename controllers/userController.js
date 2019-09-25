const Model = require('../models')
const User = Model.User

class UserController {
    static show() {
        return User.findAll()
    }
    static create(name, email, password, salt) {
        return User.create({
            name: name,
            email: email,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date(),
            salt: salt,
            status: true
        })
    }
    static findByEmail(email) {
        return User.findAll({
            where: {
                email: email
            }
        })
        .then(arr => {
            return arr[0]
        })
    }
    static update(updateObj, whereObj) {
        return User.update(updateObj, whereObj)
    }
}

module.exports = UserController