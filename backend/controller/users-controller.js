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
  console.log("aaaaaaaaaaaaa",loginPassword);
  let user, isValidPassword = false;
  try {
    user = await userModel.findOne({ email: loginEmail });
    isValidPassword = await bcrypt.compare(loginPassword, user.password);
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Wrong email or password" });
  }
  let token;
  try {
    token = jwt.sign(
      { user: user.toObject({ getters: true }) },
      'secret_pickHandle',
      { expiresIn: '5h' }
    );
  } catch (error) {
    return next(error);
  }

  // login check password
  try {
    if (isValidPassword) {
      res.json({ user: user.toObject({ getters: true }), token: token });
    } else {
      return res.status(500).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return next(error);
  }

};
//Find User Faculty or Student with filterable character
const getAllUserByType = async (req, res, next) => {
  if (req.body.findInName === ["User is not Registered"]) {
    req.body.findInName = "";
  }
  let vSearch = {
    '$and': [
      { userType: req.body.uType },
      { '$or': [{ fullName: { $regex: req.body.findInName, $options: "i" } }, { email: { $regex: req.body.findInName, $options: "i" } }] }
    ]
    // userType: req.body.uType,
    // fullName: { $regex: req.body.findInName, $options: "i" }
  };
  if (req.body.vSearch) {
    vSearch = Object.assign({ "verified": true })
  }
  const allUserType = await userModel
    .find(vSearch).sort({ "verified": 1 })
    .exec();
  if (allUserType.length == 0) {
    return res.status(201).json(['User is not Registered']);
  }
  res.json(allUserType);
};

//for users
const getVerifiedForUser = async (req, res, next) => {
  if (req.body.findInName === ["User is not Registered"]) {
    req.body.findInName = "";
  }
  let vSearch = {
    '$and': [
      { userType: req.body.uType },
    ]
  };
  if (req.body.vSearch) {
    vSearch = Object.assign({ "verified": true })
  }
  const allUserType = await userModel
    .find({
      fullName: { $regex: req.body.findInName, $options: "i" },
      userType: req.body.uType,
      verified: true
    }).limit(3)
    .exec();
  if (allUserType.length == 0) {
    return res.status(201).json(['User is not Registered']);
  }
  res.json(allUserType);
};

//Find Single User by ID
const getSingle = async (req, res, next) => {
  let user
  try {
    user = await userModel
      .findById(req.params.uID);
  } catch (error) {
    return res.status(404).json({ message: 'User is not Registered' });
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
  console.log(req.body)
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
  let complete = {
    fullName: req.body.registerName,
    email: req.body.registerEmail,
    password: hashedPassword,
    contactNumber: req.body.registerContactNumber,
    userType: req.body.registerUserType,
    birthday: req.body.registerBirthday,
    image: req.file.path,
  }
  if (
    req.body.registerUserType === "Faculty" ||
    req.body.registerUserType === "faculty"
  ) {
    if(req.body.regVerify){
      let verifiedFaculty = {verified:true}
      complete = Object.assign(verifiedFaculty,complete);
    }
    registerUser = new userModel(complete);
  } else {
    let isStudent = {
      studentNumber: req.body.registerStudentNumber,
      yearAndSection: req.body.registerCourseYearAndSection
    }
    complete = Object.assign(isStudent,complete);
    registerUser = new userModel(complete);
  }
  let token;
  try {
    token = jwt.sign(
      { user: registerUser.toObject({ getters: true }) },
      'secret_pickHandle',
      { expiresIn: '5h' }
    );
  } catch (error) {
    return next(error);
  }
  const result = await registerUser.save();

  res.status(201).json({ new: registerUser.toObject({ getters: true }), token });
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

  let isValidPassword = false;
  let user;
  try {
    user = await userModel.findById(req.body.userID);
    isValidPassword = await bcrypt.compare(req.body.verifyPassword, user.password);

  } catch (error) {
    return res.status(201).json({ error });
  }
  if (isValidPassword === true) {
    hashedPassword = await bcrypt.hash(req.body.newPassword, 6);
  } else {
    return res.status(401).json({ message: "Wrong Password Confirmation" })
  }
  try {
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword })
  } catch (error) {
    return res.status(401).json(error);
  }
  res.status(201).json(user);

};

const deleteUser = async (req, res, next) => {

  await userModel
    .findByIdAndDelete(req.params.uID)
    .then(() => {
      res.status(202).json({ message: "User has been deleted" });
    })
    .catch(() => {
      res.status(404).json({ message: "Failed to delete user" });
    });

};


const profilePicture = async (req, res) => {
  let userToUpdate;

  try {
    userToUpdate = await userModel.findByIdAndUpdate(req.body.userId, {
      profilePicture: req.file.path,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      yearAndSection: req.body.courseYearAndSection
    }, { returnOriginal: false })
      .exec();

  } catch (err) {
    return res.json(err)
  }
  try {
    token = jwt.sign(
      { user: userToUpdate.toObject({ getters: true }) },
      'secret_pickHandle',
      { expiresIn: '5h' }
    );
  } catch (error) {
    return next(error);
  }
  return res.json({ new: userToUpdate.toObject({ getters: true }), token });
}
//admin middlewares
const adminGetVerified = async (req, res, next) => {
  const allUserType = await userModel
    .find({
      userType: "Faculty",
      verified: false,
    })
    .exec();
  if (allUserType.length == 0) {
    return res.status(201).json({});
  }
  res.json(allUserType);
};

const adminVerifyFaculty = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.body.userID, { verified: true });
  return res.json(user);
}


exports.profilePicture = profilePicture;
exports.login = login;
exports.getAllUserByType = getAllUserByType;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.resetPassword = resetPassword;
exports.checkEmailIfExist = checkEmailIfExist;
exports.getVerifiedForUser = getVerifiedForUser
exports.getSingle = getSingle


//admin middleware
exports.adminGetVerified = adminGetVerified;
exports.adminVerifyFaculty = adminVerifyFaculty;