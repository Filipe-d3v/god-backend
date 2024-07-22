const ImagesProjectController = require('../controllers/ImagesprojectController');
const router = require('express').Router();
const imageUpload = require('../helpers/image-upload');
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, imageUpload.single('image'), ImagesProjectController.create);
router.get('/getimages/:id',verifyToken, ImagesProjectController.getImagesProject);


module.exports = router;