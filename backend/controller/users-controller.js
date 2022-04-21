
const HttpError = require('../models/https-error');
const uuid = require('uuid');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const userModel = require('../models/user-model');
const { check, validationResult } = require('express-validator');

const atlasUrl = 'mongodb+srv://public-user:PHCrtQ2AuZAIcE6p@cluster0.c8pz2.mongodb.net/user?retryWrites=true&w=majority';
mongoose.connect(atlasUrl)
.then(()=>{
    console.log('Connected to Atlas');
})
.catch(()=>{
    console.log('Connection Failed');
});



const getSingleUserByID = async (req, res, next) => {
    const { loginEmail, loginPassword } = req.body;
    const user = await userModel.find({email:loginEmail, password:loginPassword}).exec();
    console.log()
    if(user.length==0){
        return res.status(401).json({message:'Wrong email or password'});
    }
    res.json( user );
}
//Find User Faculty or Student with filterable character
const getAllUserByType = async  (req, res, next) => {
    const allUserType = await userModel.find({userType:req.body.uType, fullName:{ "$regex": req.body.findInName, "$options": "i"} }).exec();
    if(allUserType.length==0){
        return res.status(404).json({message:'No user has been found'});
    }
    res.json(allUserType);
}
const checkEmailIfExist = async(req,res)=>{
    const findUser = await userModel.findOne({email:req.body.registerEmail}).exec();
    if(findUser){
        return res.status(422).json({message:'Email already been used'});
    }
    res.status(201).json({message:'Email Available'});
}

const createUser = async (req, res) => {
    const errors = validationResult(req);
    const findUser = await userModel.findOne({email:req.body.registerEmail}).exec();
    if(findUser){
        return res.status(422).json({message:'Email already been used'});
    }
    if(!errors.isEmpty()){
        return res.status(422).json({message:'Invalid inputs please enter the proper fields'});
    }
    let registerUser;
    if(req.body.registerUserType === "Faculty"){
        registerUser = new userModel({
            fullName: req.body.registerName,
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            contactNumber: req.body.registerContactNumber,
            userType: req.body.registerUserType,
        });
    }else{
        registerUser = new userModel({
            fullName: req.body.registerName,
            email: req.body.registerEmail,
            password: req.body.registerPassword,
            contactNumber: req.body.registerContactNumber,
            userType: req.body.registerUserType,
            studentNumber: req.body.registerStudentNumber,
            yearAndSection: req.body.registerCourseYearAndSection,
        });
    }
    const result = await registerUser.save();
    res.status(201).json(result);
}
//Change name or email
// const updateUser = (req, res, next) => {
//     const { name, email, password } = req.body;
//     const userID = req.params.uID;
//     const userUpdated = { ...DUMMY_USERS.find(user => user.id == userID) };
//     const userIndex = DUMMY_USERS.findIndex(user => user.id == userID);
//     userUpdated.name = name;
//     userUpdated.email = email;
//     userUpdated.password = password;

//     DUMMY_USERS[userIndex] = userUpdated;

//     res.status(200).json({ user: userUpdated })
// }

const deleteUser = async (req, res, next) => {
    await userModel.findByIdAndDelete(req.params.uID).then(()=>{
        res.status(202).json({ message:"User has been deleted" })
    }).catch(()=>{
        res.status(404).json({ message:"Failed to delete user" })
    });

}


exports.getSingleUserByID = getSingleUserByID;
exports.getAllUserByType = getAllUserByType;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.checkEmailIfExist = checkEmailIfExist;

