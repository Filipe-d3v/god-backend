const router = require('express').Router()
const PhoneController = require('../controllers/PhoneControllers');
const verifyToken = require('../helpers/verify-token');

router.post('/create', PhoneController.create);




module.exports = router;