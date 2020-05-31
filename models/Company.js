var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var company = require("./Company");
var Schema = mongoose.Schema;
var companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    joiningDate: {
      type: String,
      trim: true,
      
    },
    resignedDate: {
      type: String,
      trim: true,
      
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
   },
  { timestamps: true }

);

var Company = mongoose.model("company", companySchema);

module.exports = Company;

