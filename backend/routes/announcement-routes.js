const express = require('express');
const router = express.Router();

const announcementController = require('../controller/announcement-controller');


router.post('/announcement', announcementController.allAnnouncement);

module.exports = router;