const AssessmentController = require('../controllers/AssessmentController');
const router = require('express').Router();
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, AssessmentController.create);

module.exports = router;