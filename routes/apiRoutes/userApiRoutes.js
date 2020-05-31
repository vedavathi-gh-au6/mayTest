var express = require('express');
var router = express.Router();
var {registerUser,loginUser,logoutUser} = require('../../controllers/apiControllers/userApiControllers');
var {hashPassword} = require('../../middlewares/encryptPassword');

router.post('/register', hashPassword, registerUser);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);

module.exports = router;