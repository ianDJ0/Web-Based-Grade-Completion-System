const express = require('express');
const router = express.Router();

const announcementController = require('../controller/announcement-controller');
const homepageController = require('../controller/homepage-controller');


router.post('/announcement', announcementController.allAnnouncement);
router.post('/editVMGO', homepageController.editHomepage);
router.post('/getVMGO', homepageController.getHome);



module.exports = router;