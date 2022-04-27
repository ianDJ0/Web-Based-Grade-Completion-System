const uuid = require("uuid");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const requestModel = require("../models/request-model");
const { check, validationResult } = require("express-validator");
const { find } = require("../models/user-model");

const atlasUrl =
    "mongodb+srv://public-user:PHCrtQ2AuZAIcE6p@cluster0.c8pz2.mongodb.net/user?retryWrites=true&w=majority";
mongoose
    .connect(atlasUrl)
    .then(() => {
        console.log("Connected to Atlas request api");
    })
    .catch(() => {
        console.log("Connection Failed");
    });

const studentCreateRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res
            .status(422)
            .json({ message: "Invalid inputs please enter the proper fields" });
    }
    let studentRequest;
    studentRequest = new requestModel({

        subject: req.body.subject,
        incompletePeriod: req.body.incompletePeriod,
        incompleteYear: req.body.incompleteYear,
        reason: req.body.reason,
        signature: {
            studentSignature: req.body.studentSignature
        },
        instructor: {
            instructorID: mongoose.Types.ObjectId(req.body.instructorID),
            instructorName: req.body.instructorName
        },
        student: {
            studentID: mongoose.Types.ObjectId(req.body.studentID),
            studentFullname: req.body.studentFullname,
            studentNumber: req.body.studentNumber,
            studentYearAndSection: req.body.studentYearAndSection
        }
    })
    console.log(studentRequest);
    let result
    try {
        result = await studentRequest.save();
    } catch (error) {
        return res.json(error);
    }
    return res.json({ new: result });

}
const instructorRespondRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res
            .status(422)
            .json({ message: "Invalid inputs please enter the proper fields" });
    }
    let instructorUpdate;
    const mongooseID = mongoose.Types.ObjectId(req.body.requestID);
    try{
        instructorUpdate = await requestModel
        .findOneAndUpdate({id:mongooseID},{ 
            grade: req.body.grade,
            "$set":{"dateLog.dateInstructor":Date.now(), "signature.instructorSignature":req.body.instructorSignature},
        },{returnOriginal: false})
        .exec();
    }catch(err){
        return res
        .status(422)
        ,json(err)
    }
    return res.status(201).json(instructorUpdate);
}
exports.studentCreateRequest = studentCreateRequest;
exports.instructorRespondRequest = instructorRespondRequest;

