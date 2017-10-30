var crypto = require('crypto');
function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};
module.exports = md5;