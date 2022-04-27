const express = require('express');
const { check } = require('express-validator');
const HttpError = require('../models/https-error');
const userController = require('../controller/users-controller');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();
const checkAuth = require('../middleware/Authentication');



//Get Single User API
router.post('/softValidate',userController.checkEmailIfExist);
router.post('/login', userController.login);
router.post('/type', userController.getAllUserByType);

//Create New User API
router.post('/signup',check('registerName').isEmpty(),
    fileUpload.single('image'),
    [
        check('registerName').notEmpty(),
        check('registerEmail').isEmail(),
        check('registerContactNumber').isNumeric(),
        check('registerPassword').isLength({min:6}),
        check('registerUserType').isLength({min:3}),
    ],
    userController.createUser);
    
//Edit or delete User by ID API
router.use(checkAuth)
router.post('/resetEmail', userController.updateUser);
router.patch('/changePassword', userController.resetPassword);
router.delete('/:uID', userController.deleteUser);

module.exports = router;