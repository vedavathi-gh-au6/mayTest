var bcrypt = require('bcrypt');

module.exports = {
    hashPassword : function (req,res,next) {
        bcrypt.hash(req.body.password, 10)
        .then(function (hashedPassword) {
            req.body.password = hashedPassword;
            next();
        })
    }
}