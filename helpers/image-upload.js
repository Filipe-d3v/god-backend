const multer = require('multer')
const patch = require('path')
const multerS3 = require('multer-s3')
const crypto = require('crypto')
const aws = require('aws-sdk')

const storageTypes = {
  local: multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = ''
      if (req.baseUrl.includes('users')) {
        folder = 'users'
      } else if (req.baseUrl.includes('skills')) {
        folder = 'skills'
      } else if (req.baseUrl.includes('projects')) {
        folder = 'projects'
      } else if (req.baseUrl.includes('imagesproject')) {
        folder = 'imgproject'
      }

      cb(null, `public/img/${folder}`)
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'portdev-img',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  }),
}

const imageUploadLocal = multer({
  storage: storageTypes.local, fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|PNG|jpg|jpeg)$/)) {
      return cb(new Error('Apenas imagens JPG, PNG, JPEG são permitidas!'))
    }
    cb(undefined, true)
  },
})

module.exports = imageUploadLocal