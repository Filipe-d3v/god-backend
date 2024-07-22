const router = require('express').Router();

const LevelController = require('../controllers/LevelController');
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, LevelController.create);
router.get('/getuserskills/:id', verifyToken, LevelController.getUserSkills);
router.get('/getmyskills', verifyToken, LevelController.getMySkills);
router.delete('/delete/:id', verifyToken, LevelController.delete);

module.exports = router;