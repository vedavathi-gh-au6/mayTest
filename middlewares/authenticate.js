var fs = require('../utils/promisifyFS');

module.exports = function (req, res, next) {
    if (req.session.userId) {
        fs.readFilePromise('./data/users.json')
            .then(function (usersData) {
                var usersArr = JSON.parse(usersData);
                res.locals.user = usersArr.find(function (user) {
                    return user.id === req.session.userId;
                })
                //console.log(res.locals.user)
                next();
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect("/login");
            });
    } else {
        res.redirect('/login');
    }
}