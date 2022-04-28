const express = require('express');
const { check } = require('express-validator');
const HttpError = require('../models/https-error');
const requestController = require('../controller/request-controller');
const router = express.Router();
const checkAuth = require('../middleware/Authentication');


//Student create Request
router.post('/studentCreateRequest',
    [
        check('studentID').notEmpty(),
        check('instructorID').notEmpty(),
        check('subject').notEmpty(),
        check('incompletePeriod').notEmpty(),
        check('incompleteYear').notEmpty(),
    ],
    requestController.studentCreateRequest);

router.post('/instructorRespondRequest', requestController.instructorRespondRequest)
router.post('/officeRespondRequest', requestController.officeRespondRequest)

module.exports = router;