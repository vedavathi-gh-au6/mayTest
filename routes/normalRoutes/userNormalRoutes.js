var express = require('express');
var router = express.Router();
var { renderRegister, renderLogin, renderDashboard } = require('../../controllers/normalControllers/userNormalControllers');
var authenticate = require('../../middlewares/authenticate');

router.get('/register', renderRegister);
router.get('/login', renderLogin);
router.get('/dashboard', authenticate, renderDashboard);

module.exports = router;