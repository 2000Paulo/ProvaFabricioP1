const router = require('express').Router();
const userRouter = require('../index');
router.use('/', userRouter);
module.exports = router;

