var express = require("express");
var hbs = require("hbs");
var path = require("path");
var session = require("express-session");
//var scokkie = require("express-session");
var methodOverride = require("method-override");
var fetch = require("node-fetch");
require('./utils/hbsHelpers');
const dotenv=require('dotenv')

var userNormalRoutes = require('./routes/normalRoutes/userNormalRoutes');
var blogNormalRoutes = require('./routes/normalRoutes/blogNormalRoutes');
var userApiRoutes = require('./routes/apiRoutes/userApiRoutes');
var blogApiRoutes = require('./routes/apiRoutes/blogApiRoutes');

var app = express();

//hbs
app.set('trust proxy', 1);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view options", { layout: "../layouts/main" });
hbs.registerPartials(path.join(__dirname, "views", "partials"));
//bodyParser
app.use(express.urlencoded({ extended: false }));
//session
app.use(
    session({
        secret: "random1234",
        resave: false,
        name: "blogSession",
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        }
    })
);
const PORT = process.env.PORT || 8000;
app.use(methodOverride('_method'));
//routes
app.use(userNormalRoutes);
app.use(blogNormalRoutes);
app.use(userApiRoutes);
app.use(blogApiRoutes);

app.use('/', function (req,res) {
    var blogs = fetch(`http://localhost:${PORT}/blogs`)
    .then(function (blogs) {
        return blogs.json();
    })
    .then(function (blogs) {
        res.render('home', {title : "EmployeeHub", blogs, type : "home", isAuth : req.session.userId});
    })
});

app.use(function(req,res,next){
    if(!req.session){
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
    });

app.listen(PORT, function () {
    console.log("Server started on port",PORT);
});