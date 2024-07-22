const router = require('express').Router();

const routesController = require('../controllers/RatingController');

const verifyToken = require('../helpers/get-token');

router.post('/create', verifyToken, routesController.create);


module.exports = router;