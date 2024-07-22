const PostController = require('../controllers/PostControllers');
const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, PostController.create);
router.get('/getall', verifyToken, PostController.getAll);


module.exports = router;