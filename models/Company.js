var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    joiningDate: {
      type: Date,
      default: Date.now
      
    },
    resignedDate: {
      type: Date,
      default: Date.now
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
