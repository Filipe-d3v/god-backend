const QuestionController = require('../controllers/QuestionControllers');

const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, QuestionController.create);
router.get('/getall', verifyToken, QuestionController.getAll);
router.get('/getbyid/:id', verifyToken, QuestionController.getById);

module.exports = router;