var express = require('express');
var router = express.Router();
var {getBlogs,createBlog,updateBlog,deleteBlog} = require('../../controllers/apiControllers/blogApiControllers');

router.get('/blogs', getBlogs);
router.post('/blog/create', createBlog);
router.put('/blog/update/:blogId', updateBlog);
router.delete('/blog/delete/:blogId', deleteBlog);

module.exports = router;