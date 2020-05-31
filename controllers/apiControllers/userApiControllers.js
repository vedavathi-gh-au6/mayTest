var uuid = require('uuid/v4');
var bcrypt = require('bcrypt');
var fs = require('../../utils/promisifyFS');

var userApiController = {};

userApiController.registerUser = function (req, res) {
    var user = {
        id: uuid(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        blogs: []
    }
    fs.readFilePromise('./data/users.json')
        .then(function (usersData) {
            return JSON.parse(usersData);
        })
        .then(function (usersData) {
            usersData.push(user);
            fs.writeFilePromise('./data/users.json', JSON.stringify(usersData))
            .then(function (resolvedValue) {
                console.log(resolvedValue)
                res.redirect('/login');
            })
            .catch(function (error) {
                console.log(err.message);
                res.redirect('/register');
            })  
        })
        .catch(function (error) {
            console.log(err.message);
            res.redirect('/register');
        })    
}

userApiController.loginUser = function (req, res) {
    var email = req.body.email;
    var pwd = req.body.password;
    fs.readFilePromise('./data/users.json')
        .then(function (usersData) {
            return JSON.parse(usersData);
        })
        .then(function (usersData) {
            var user = usersData.find(function (user) {
                return user.email === email;
            });
            return bcrypt.compare(pwd, user.password)
            .then(function (result) {
                if (result) return user;
                return result;
            })
        })
        .then(function (user) {
            if (user) {
                req.session.userId = user.id;
                return res.redirect('/dashboard');
            }
            res.redirect('/login')
        })
        .catch(function (err) {
            console.log(err.message);
            res.redirect('/login')
        })
}

userApiController.logoutUser = function (req, res) {
    req.session.destroy();
    res.redirect('/home');
}

module.exports = userApiController;