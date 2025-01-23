const VisitsController = require('../controllers/VisitsController');
const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, VisitsController.create);

module.exports = router;