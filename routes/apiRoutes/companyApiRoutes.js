var express = require("express");
var router = express.Router();
var authenticate = require('../../middlewares/authenticate');
var companyAPIController = require("../../controllers/apiControllers/companyApiControllers");
// Today's tasks (these are created by a user only. IN other words we need to make sure that the user is sending the accessToken)

// CREATE Url.
// title, body, isCompleted, createdAt, user
router.post("/add/company", authenticate, companyAPIController.addCompany);
//router.get("/:urlId",authenticate,urlAPIController.clickUrl)


// UPDATE todos by id.
//router.patch("/todos/update/:urlId", authenticate, urlAPIController.updateUrlById);
//router.get(""/urls/:urlId)
// DELETE todos by id.
//router.delete("/todos/delete/:urlId", authenticate, urlAPIController.deleteUrlById);

module.exports = router;
