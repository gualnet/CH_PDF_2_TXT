const router = require('express').Router({ mergeParams: true });
const controllers = require('./pdf.controllers');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router
  .post('/upload', upload.single('file'), controllers.uploadFile);

module.exports = router;