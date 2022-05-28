const express = require('express');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

const announcementController = require('../controller/announcement-controller');
const homepageController = require('../controller/homepage-controller');


router.post('/announcement', announcementController.allAnnouncement);
router.post('/editVMGO', homepageController.editHomepage);
router.post('/editLogo', fileUpload.single('image'),homepageController.editLogo);
router.post('/editTitle', homepageController.editTitle);
router.post('/getVMGO', homepageController.getHome);



module.exports = router;