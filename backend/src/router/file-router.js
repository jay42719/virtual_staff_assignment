'use strict';

const {
    Router
} = require("express");

const router = new Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const fileController = require("../controller/file-controller");

router.get('/list', fileController.list);
router.post('/upload', upload.single('file'), fileController.upload);

module.exports = router;