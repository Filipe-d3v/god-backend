const DocsProjectController = require('../controllers/DocsProjectController');
const router = require('express').Router();
const fileUpload = require('../helpers/file-upload');
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, fileUpload.single('doc'), DocsProjectController.create);
router.get('/getdocs/:id',verifyToken, DocsProjectController.getDocsProject);


module.exports = router;