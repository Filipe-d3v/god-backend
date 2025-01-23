const projectController = require('../controllers/ProjectController');

const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');
const uploadImage = require('../helpers/image-upload');
const fileUpload = require('../helpers/file-upload');
const ProjectController = require('../controllers/ProjectController');

router.post('/create', verifyToken, uploadImage.single('image'), projectController.create);
router.get('/getall', projectController.getAll);
router.get('/alluserprojects', verifyToken, projectController.getAllUserProjects);
router.get('/getbyid/:id', verifyToken, projectController.getProjectById);
router.patch('/update/:id', verifyToken, uploadImage.single('image'), projectController.update);
router.patch('/addimages/:id', verifyToken, uploadImage.array('images'), projectController.addImages);
router.patch('/adddocs/:id', verifyToken, fileUpload.single('docs'), projectController.addDocs);
router.delete('/delete/:id', verifyToken, ProjectController.delete);
router.get('/top10', verifyToken, projectController.getTop10);



module.exports = router;