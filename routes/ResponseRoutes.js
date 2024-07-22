const ResponseController = require('../controllers/ResponseController');
const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, ResponseController.create);
router.get('/getall', verifyToken, ResponseController.getAll);


module.exports = router;