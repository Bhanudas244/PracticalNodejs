const express = require('express');
const route = express.Router()
const ReelController = require('../controller/reel.controller');
const fs = require('fs');

const multer = require("multer");
const storage = require("../middleware/multer");
const upload = multer({
  storage,
});



route.get('/', ReelController.index)
route.post(
    "/upload",
    upload.fields([
      { name: "video" },
    ]),
    ReelController.store
  );
  route.get('/:reelId', ReelController.edit)
  route.patch(
    "/update/:reelId",
    upload.fields([
      { name: "video" },
    ]),
    ReelController.update
  );
  route.delete('/delete/:reelId', ReelController.delete)

module.exports = route