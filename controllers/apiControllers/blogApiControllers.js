var uuid = require('uuid/v4');
var fs = require('../../utils/promisifyFS');

var blogApiController = {};

blogApiController.getBlogs = function (req,res) {
    fs.readFilePromise('./data/users.json')
        .then(function (usersData) {
            return JSON.parse(usersData);
        })
        .then(function (usersData) {
            var blogs = [];
            usersData.forEach(user => {
                blogs = [...blogs,...user.blogs];
            });
            res.send(blogs);
        })
}

blogApiController.createBlog = function (req,res) {
    var blog = {
        id : uuid(),
        title : req.body.blogTitle,
        content : req.body.blogContent
    }
    fs.readFilePromise('./data/users.json')
        .then(function (usersData) {
            return JSON.parse(usersData);
        })
        .then(function (usersData) {
            var usersDataUpdatedWithBlog =  usersData.map(function (user) {
                if (user.id === req.session.userId){
                    user.blogs.push(blog);
                    return user;
                }
                return user;
            })
            console.log(usersDataUpdatedWithBlog)
            return usersDataUpdatedWithBlog;
        })
        .then(function (usersData) {
            fs.writeFilePromise('./data/users.json', JSON.stringify(usersData))
            .then(function (resolvedValue) {
                console.log(resolvedValue)
                res.redirect('/dashboard');
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect('/blog/create');
            })  
        })
        .catch(function (err) {
            console.log(err.message);
            res.redirect('/blog/create');
        })  
}

blogApiController.updateBlog = function (req,res) {
    var blogId = req.params.blogId;
    var updatedTitle = req.body.blogTitle;
    var updatedContent = req.body.blogContent;
    fs.readFilePromise('./data/users.json')
        .then(function (usersData) {
            return JSON.parse(usersData);
        })
        .then(function (usersData) {
            var usersData = usersData.map(function (user) {
                if (user.id === req.session.userId){
                    user.blogs.map(function (blog) {
                        if (blog.id === blogId){
                            blog.title = updatedTitle;
                            blog.content = updatedContent;
                            return blog;
                        }
                        return blog;
                    });
                    return user;
                }
                return user;
            })
            return usersData;
        })
        .then(function (usersData) {
            fs.writeFilePromise('./data/users.json', JSON.stringify(usersData))
            .then(function (resolvedValue) {
                console.log(resolvedValue)
                res.redirect('/dashboard');
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`/blog/update/${blogId}`);
            })  
        })
        .catch(function (err) {
            console.log(err.message);
            res.redirect(`/blog/update/${blogId}`);
        })  
}

blogApiController.deleteBlog = function (req,res) {
    var blogId = req.params.blogId;
    fs.readFilePromise('./data/users.json')
        .then(function (usersData) {
            return JSON.parse(usersData);
        })
        .then(function (usersData) {
            var usersData = usersData.map(function (user) {
                if (user.id === req.session.userId){
                    user.blogs = user.blogs.filter(function (blog) {
                        return blog.id !== blogId;
                    });
                    return user;
                }
                return user;
            })
            return usersData;
        })
        .then(function (usersData) {
            fs.writeFilePromise('./data/users.json', JSON.stringify(usersData))
            .then(function (resolvedValue) {
                console.log(resolvedValue)
                res.redirect('/dashboard');
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect('/dashboard');
            })  
        })
        .catch(function (err) {
            console.log(err.message);
            res.redirect('/dashboard');
        })  
}

module.exports = blogApiController;