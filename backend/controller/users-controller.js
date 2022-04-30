const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const userModel = require("../models/user-model");
const { check, validationResult } = require("express-validator");
const { find } = require("../models/user-model");

const atlasUrl =
  "mongodb+srv://public-user:PHCrtQ2AuZAIcE6p@cluster0.c8pz2.mongodb.net/user?retryWrites=true&w=majority";
mongoose
  .connect(atlasUrl)
  .then(() => {
    console.log("Connected to Atlas");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

const login = async (req, res, next) => {
  const { loginEmail, loginPassword } = req.body;
  let user, isValidPassword = false;
  try {
    user = await userModel.findOne({ email: loginEmail });
    isValidPassword = await bcrypt.compare(loginPassword, user.password);
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }
  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: "Try logging in later" });
  }
  let token;
  try {
    token = jwt.sign(
      { user: user.toObject({ getters: true }) },
      'secret_pickHandle',
      { expiresIn: '1h' }
    );
  } catch (error) {
    return next(error);
  }

  // login check password
  try {
    if (isValidPassword) {
      res.json({ user: user.toObject({ getters: true }) , token:token});
    } else {
      return res.status(500).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return next(error);
  }

};
//Find User Faculty or Student with filterable character
const getAllUserByType = async (req, res, next) => {
  if(req.body.findInName === ["User is not Registered"]){
    req.body.findInName="";
  }
  const allUserType = await userModel
    .find({
      userType: req.body.uType,
      fullName: { $regex: req.body.findInName, $options: "i" },
    })
    .exec();
  if (allUserType.length == 0) {
    return res.status(201).json(['User is not Registered']);
  }
  res.json(allUserType);
};


//Find Single User by ID
const getSingle = async (req, res, next) => {
  let user
  try{
      user = await userModel
    .findById(req.params.uID);
  }catch(error){
    return res.status(404).json({message:'User is not Registered'});
  }
  if (user.length == 0) {
    return res.status(404).json(['User is not Registered']);
  }
  res.json(user);
};

const checkEmailIfExist = async (req, res) => {
  const findUser = await userModel
    .findOne({ email: req.body.registerEmail })
    .exec();
  if (findUser) {
    
    return res.status(422).json({ message: "Email already been used" });
  }
  res.status(201).json({ message: "Email Available" });
};

///
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  const findUser = await userModel
    .findOne({ email: req.body.registerEmail })
    .exec();
  if (findUser) {
    return res.status(422).json({ message: "Email already been used" });
  }
  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(422)
      .json({ message: "Invalid inputs please enter the proper fields" });
  }
  let registerUser;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.registerPassword, 6);
  } catch (error) {
    return next(error);
  }

  if (
    req.body.registerUserType === "Faculty" ||
    req.body.registerUserType === "faculty"
  ) {
    registerUser = new userModel({
      fullName: req.body.registerName,
      email: req.body.registerEmail,
      password: hashedPassword,
      contactNumber: req.body.registerContactNumber,
      userType: req.body.registerUserType,
      birthday:req.body.registerBirthday,
      image: req.file.path,
    });
  } else {
    registerUser = new userModel({
      fullName: req.body.registerName,
      email: req.body.registerEmail,
      password: hashedPassword,
      contactNumber: req.body.registerContactNumber,
      userType: req.body.registerUserType,
      birthday:req.body.registerBirthday,
      studentNumber: req.body.registerStudentNumber,
      yearAndSection: req.body.registerCourseYearAndSection,
      image: req.file.path,
    });
  }
  let token;
  try {
    token = jwt.sign(
      { user: registerUser.toObject({ getters: true }) },
      'secret_pickHandle',
      { expiresIn: '1h' }
    );
  } catch (error) {
    return next(error);
  }
  const result = await registerUser.save();

  res.status(201).json({new:registerUser.toObject({getters: true}), token});
};
//Change name or email
const updateUser = async (req, res, next) => {
  const findUser = await userModel
    .findOne({ email: req.body.registerEmail })
    .exec();
  if (!findUser) {
    return res.status(422).json({ message: "User does not exist" });
  }
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "cole.goldner41@ethereal.email",
      pass: "BVPVEBXyWYpU47tAgr",
    },
  });
  const message = {
    from: '"Grade Completion System" <cole.goldner41@ethereal.email>', // sender address
    to: `${req.body.registerEmail}`, // list of receivers
    subject: "Change Password",
    text: "",
    html: "<b>Hello world?</b>", //insert forgot password hyperlink
  };
  let info = await transporter.sendMail(message);

  res.status(200).json(nodemailer.getTestMessageUrl(info));
};
//Reset Password middleware
const resetPassword = async (req, res) => {
  const findUser = await userModel
    .findByIdAndUpdate(req.body.userID, { password: req.body.newPassword })
    .exec();
  if (!findUser) {
    res.status(404).json({ message: "User di makita" });
  }
  res.status(204).json({ message: "Password updated!" });
};
const deleteUser = async (req, res, next) => {
  const dataObject = JSON.parse(JSON.stringify(res.locals.user.userData));
  if(dataObject.userType !== "Admin"){
    console.log(dataObject);
    return res.status(403).json({message: "No Access!"});
  }
  await userModel
    .findByIdAndDelete(req.params.uID)
    .then(() => {
      res.status(202).json({ message: "User has been deleted" });
    })
    .catch(() => {
      res.status(404).json({ message: "Failed to delete user" });
    });
};

exports.login = login;
exports.getAllUserByType = getAllUserByType;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.resetPassword = resetPassword;
exports.checkEmailIfExist = checkEmailIfExist;
exports.getSingle = getSingle