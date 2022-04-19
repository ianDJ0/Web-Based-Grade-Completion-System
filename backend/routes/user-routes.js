const express = require('express');
const { check } = require('express-validator');
const HttpError = require('../models/https-error');
const userController = require('../controller/users-controller');
const router = express.Router();



//Get Single User API
router.post('/login', userController.getSingleUserByID);
router.post('/type', userController.getAllUserByType);
//Create New User API
router.post('/signup',
    [
        check('registerName').notEmpty(),
        check('registerEmail').isEmail(),
        check('registerContactNumber').isNumeric(),
        check('registerPassword').isLength({min:6}),
        check('registerUserType').isLength({min:3})
    ],
    userController.createUser);
//Edit or delete User by ID API
router.patch('/:uID', userController.updateUser);
router.delete('/:uID', userController.deleteUser);

module.exports = router;