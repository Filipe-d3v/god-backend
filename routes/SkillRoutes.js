const skillController = require('../controllers/SkillController')

const router = require('express').Router()
const uploadImage = require('../helpers/image-upload')

router.post('/create', uploadImage.single('icon'), skillController.create)
router.get('/getall', skillController.getAll)
router.get('/:id', skillController.getById)
router.patch('/:id', skillController.update)
router.delete('/:id', skillController.delete)

module.exports = router