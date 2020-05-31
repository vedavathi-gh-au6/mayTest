var express = require("express");
var router = express.Router();
var authenticate = require("../../middlewares/authenticate");
var companyNormalControllers = require("../../controllers/normalControllers/companyNormalControllers");

// Dashboard page
router.get("/company", authenticate, companyNormalControllers.renderCompanyPage);

// Create url page
router.get("/add/company", authenticate, companyNormalControllers.renderaddCompnayPage);

// Update url page
//router.get("/todo/update/:todoId", authenticate, urlNormalControllers.renderUpdateTodoPage);

module.exports = router;
