var express = require("express");
var hbs = require("hbs");
var path = require("path");
var methodOverride = require("method-override");
var session = require("express-session");
require("./utils/hbs");
require("./db");
Company=require("./models/Company")

// Routes of both API as well as normal
var urlAPIRoutes = require("./routes/apiRoutes/companyApiRoutes");
var userAPIRoutes = require("./routes/apiRoutes/userApiRoutes");
var urlNormalRoutes = require("./routes/normalRoutes/companyNormalRoutes");
var userNormalRoutes = require("./routes/normalRoutes/userNormalRoutes");

// Init
var app = express();

// Setting HBS as template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view options", { layout: "layout" });

// Registering hbs partials
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Having user form body parsed
app.use(express.urlencoded({ extended: false }));

// Adding custom request type override query key name
app.use(methodOverride("cadbury"));

// Adding the session capabilities
app.use(
  session({
    secret: "companysecretkey",
    resave: false,
    name: "companysession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

app.use(userNormalRoutes);
app.use(urlNormalRoutes);
app.use(userAPIRoutes);
app.use(urlAPIRoutes);
/*
app.get("/", function(req, res) {
  return res.render("index", {
    title: "Home page",
    userId: req.session.userId
  });
});
*/
app.get("/",function(req, res) {
   Company.find({})
    .then(function(companies) {
      return res.render("index", {
        title: "Home page",
        userId: req.session.userId ,
        companies: companies,
        length: companies.length
      });
      //console.log(company.length)
    })
    .catch(function(err) {
      console.log(err.message);
      return res.status(500).send("Server error");
    });
});

/*
app.get("/add/company",function(req, res) {
  res.render("addCompany", {
    userId: req.user.id,
    title: "Company create page"
  });
});

app.put("/add/company",async(req,res)=>{
  try{
    console.log(req.body)
    console.log("inside create company1111")
    const companydetails = await new Company(req.body).save()
    console.log(companydetails)
    res.send("created successfully");
     }
   catch(err)  {
      console.log(err.messsage);
      return res.status(500).send("Server Error");
      
}}   );

app.get("/company",function(req, res) {
  var user = req.user;
  Company.find({})
    .then(function(company) {
      return res.render("dashboard", {
        userId: user.id,
        name: user.name,
        company: company,
        length: company.length
      });
    })
    .catch(function(err) {
      console.log(err.message);
      return res.status(500).send("Server error");
    });
});
*/

PORT =1111
app.listen(PORT, function() {
  console.log("Server started on port '$PORT`"); 
});
