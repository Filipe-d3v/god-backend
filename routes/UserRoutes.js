const UserController = require('../controllers/UserController');
const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');
const uploadImage = require('../helpers/image-upload');

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.get('/userdetails/:id', verifyToken, UserController.getUserById);
router.patch('/update/:id', verifyToken, uploadImage.single('image'), UserController.update);
router.get('/', UserController.getAll);
router.get('/checkuser/profile', UserController.checkUser);
router.get('/topusers', verifyToken, UserController.getTop10);



module.exports = router;