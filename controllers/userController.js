const Model = require('../models')
const User = Model.User

class UserController {
    static show(obj = {}) {
        return User.findAll(obj)
    }
    static findOnline() {
        return this.show({
            where: {
                status : true
            }
        })
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
        return this.show({
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