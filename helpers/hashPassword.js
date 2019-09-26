const hashPassword = (password) => {
    const bcrypt = require('bcrypt');
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

module.exports = hashPassword