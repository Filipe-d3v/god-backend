const multer = require('multer')
const path = require('path')

//Destino para imagens
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = ''
    if (req.baseUrl.includes('users')) {
      folder = 'users'
    } else if (req.baseUrl.includes('docsproject')) {
      folder = 'projects'
    }

    cb(null, `public/files/${folder}`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname))
  }
})

const fileUpload = multer({
  storage: fileStorage, fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|PDF)$/)) {
      return cb(new Error('Apenas Arquivos no formato PDF são permitidos!'))
    }
    cb(undefined, true)
  },
})

module.exports = fileUpload