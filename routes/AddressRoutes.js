const router = require('express').Router();
const AddresController = require('../controllers/AddressController');
const verifyToken = require('../helpers/verify-token');

router.post('/create', AddresController.create);





module.exports = router;