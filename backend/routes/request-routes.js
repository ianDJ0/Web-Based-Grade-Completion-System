const express = require('express');
const { check } = require('express-validator');
const HttpError = require('../models/https-error');
const requestController = require('../controller/request-controller');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();


//Student create Request
router.post('/login', requestController.getSingleUserByID);