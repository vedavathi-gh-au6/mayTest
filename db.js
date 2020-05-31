var mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config();
/*
mongoose
  .connect("mongodb://127.0.0.1:27017/EmployeeHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(function() {
    console.log("Database connected successfully");
  })
  .catch(function(err) {
    console.log(err.message);
  });



var mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/ShortURLs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(function() {
    console.log("Database connected successfully");
  })
  .catch(function(err) {
    console.log(err.message);
  });

*/

  async function init() {
    try {
      var db =  await mongoose.connect(process.env.DB_CONNECT,
      { useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true });
        console.log('connected to mongodb-atlas');
    } catch (error) {
        console.log("error in mongodb-atlas connnection");
        console.log(error);
    }
  }
  init();
