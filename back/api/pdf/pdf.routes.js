const router = require('express').Router({ mergeParams: true });
const controllers = require('./pdf.controllers');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router
  .post('/', upload.single('file'), controllers.uploadFile)
  .get('/text/:fileUID', controllers.extractText);

module.exports = router;