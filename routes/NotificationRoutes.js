const router = require('express').Router();
const NotificationController = require('../controllers/NotificationController');
const verifyToken = require('../helpers/verify-token');

router.get('/getall', verifyToken, NotificationController.getAll);



module.exports = router;