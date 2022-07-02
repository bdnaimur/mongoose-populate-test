const router = require('express').Router();
const bankRouter = require('./bank/bank.router');
const blogRouter = require('./blog/blog.route');
const commentRouter = require('./comment/comment.route');


router.use('/users', bankRouter);
router.use('/blogs', blogRouter);
router.use('/comments', commentRouter);

module.exports = router;