
const hashPassword = (password, salt) => {
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', salt)
            .update(password)
            .digest('hex');
    return hash
}

module.exports = hashPassword