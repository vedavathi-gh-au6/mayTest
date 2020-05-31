var express = require('express');
var router = express.Router();
var {renderCreateBlog,renderUpdateBlog} = require('../../controllers/normalControllers/blogNormalControllers');
var authenticate = require('../../middlewares/authenticate');

router.get('/blog/create', authenticate, renderCreateBlog);
router.get('/blog/update/:blogId', authenticate, renderUpdateBlog);

module.exports = router;