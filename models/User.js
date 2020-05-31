var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var company = require("./Company");
var Schema = mongoose.Schema;
var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    curr_company:{
      type: String,
      required: true,
      trim: true
    },
    company: [
      {
        type: Schema.Types.ObjectId,
        ref: "company"
      }
    ]
        
  },
  { timestamps: true }
);
/*
var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    urls: [
      {
        type: Schema.Types.ObjectId,
        ref: "urls"
      }
    ]
  },
  { timestamps: true }
);
*/
userSchema.statics.findByEmailAndPassword = function(email, password) {
  var userObj = null;
  return new Promise(function(resolve, reject) {
    User.findOne({ email: email })
      .then(function(user) {
        if (!user) reject("Incorrect credentials");
        userObj = user;
        return bcrypt.compare(password, user.password);
      })
      .then(function(isMatched) {
        if (!isMatched) reject("Incorrect credentials");
        resolve(userObj);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

// I should avoid rehashing the password twice.
userSchema.pre("save", function(next) {
  var user = this;
  // Check whether password field is modified
  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, 10)
      .then(function(hashedPassword) {
        user.password = hashedPassword;
        next();
      })
      .catch(function(err) {
        next(err);
      });
  }
});

// Delete all user created todos, if the user gets deleted, to avoid polluting the DB
userSchema.pre("remove", function(next) {
  Todo.deleteMany({ user: this._id })
    .then(function() {
      next();
    })
    .catch(function(err) {
      next(err);
    });
});

var User = mongoose.model("user", userSchema);

module.exports = User;
