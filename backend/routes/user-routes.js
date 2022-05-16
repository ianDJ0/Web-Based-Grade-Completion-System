const express = require('express');
const { check } = require('express-validator');
const HttpError = require('../models/https-error');
const userController = require('../controller/users-controller');
const messageController = require('../controller/message-controller');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();
const checkAuth = require('../middleware/Authentication');


router.post('/admin/verified', userController.adminGetVerified);
router.post('/getType', userController.getVerifiedForUser);

//Get Single User API
router.post('/softValidate',userController.checkEmailIfExist);
router.post('/login', userController.login);
router.post('/profileChange',fileUpload.single('image'),userController.profilePicture);
router.post('/type', userController.getAllUserByType);
router.get('/findUser/:uID', userController.getSingle);
router.delete('/:uID', userController.deleteUser);

//messages
router.post('/sendMessage', messageController.sendMessage);
router.post('/getLatestMessages', messageController.getLatestMessages);
router.post('/getMessages', messageController.getMessages)


//Create New User API
router.post('/signup',
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
router.post('/verifyUser', userController.adminVerifyFaculty);
router.post('/resetEmail', userController.updateUser);
router.post('/changePassword', userController.resetPassword);


module.exports = router;