const uuid = require("uuid");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const requestModel = require("../models/request-model");
const notificationModel = require("../models/notification-model");
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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log(errors);
    //     return res
    //         .status(422)
    //         .json({ message: "Invalid inputs please enter the proper fields" });
    // }
    const userData = JSON.parse(JSON.stringify(res.locals.user.userData));
    if (userData.userType !== "Student") {
        return res.status(403).json({ message: "Requesting with invalid user type" })
    }
    let studentRequest;
    studentRequest = new requestModel({
        subjectCode: req.body.subject,
        subjectDescription: req.body.subjectDescription,
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
        },
        status: "REQUESTED"
    });


    let result
    try {
        result = await studentRequest.save();
    } catch (error) {
        return res.json(error);
    }
    //generate notification
    let notification;
    try{
        notification = new notificationModel({
            requestCode: studentRequest._id,
            contents:`${req.body.studentFullname} has requested grade completion`,
            updater:{
                updaterID: mongoose.Types.ObjectId(req.body.studentID),
                updaterName: req.body.studentFullname,
            },
            receiver:{
                receiverID: mongoose.Types.ObjectId(req.body.instructorID),
                receiverName: req.body.instructorName,
            },
        })
        await notification.save();
    }catch(error){
        return console.log(error);
    }
    return res.json({ new: result , notification: notification});

}
const instructorRespondRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res
            .status(422)
            .json({ message: "Invalid inputs please enter the proper fields" });
    }
    const userData = JSON.parse(JSON.stringify(res.locals.user.userData));
    if (userData.userType !== "Faculty") {
        return res.status(403).json({ message: "Requesting with invalid user type" })
    }

    let instructorUpdate;
    let insructorStatus = parseFloat(req.body.grade) <= 3 ? "SUBMITTED" : "DENIED";


    try {
        instructorUpdate = await requestModel
            .findByIdAndUpdate(req.body.requestID, {
                grade: req.body.grade,
                status: insructorStatus,
                "$set": { "dateLog.dateInstructor": Date.now(), "signature.instructorSignature": req.body.instructorSignature },
            }, { returnOriginal: false })
            .exec();
    } catch (err) {
        return res
            .status(422)
            , json(err)
    }

    let notification;
    try{
        notification = new notificationModel({
            requestCode: req.body.requestID,
            contents:`${instructorUpdate.instructor.instructorName} has submitted your request to Office`,
            updater:{
                updaterID: mongoose.Types.ObjectId(instructorUpdate.instructor.instructorID),
                updaterName: instructorUpdate.instructor.instructorName,
            },
            receiver:{
                receiverID: mongoose.Types.ObjectId(instructorUpdate.student.studentID),
                receiverName: instructorUpdate.student.studentFullname,
            },
        })
        await notification.save();
    }catch(error){
        return console.log(error);
    }

    return res.status(201).json(instructorUpdate);
}

const officeRespondRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res
            .status(422)
            .json({ message: "Invalid inputs please enter the proper fields" });
    }
    const userData = JSON.parse(JSON.stringify(res.locals.user.userData));
    if (userData.userType !== "Admin") {
        return res.status(403).json({ message: "Requesting with invalid user type" })
    }
    let officeUpdate;
    // let today = new Date();
    // let dd = today.getDate();
    // let mm = today.toLocaleString('default', { month: 'long' });
    // var yyyy = today.getFullYear();
    try {
        const d = new Date();
        d.setDate(d.getDate() + 14);
        officeUpdate = await requestModel
            .findByIdAndUpdate(req.body.requestID, {
                status: "ON PROCESS",
                "$set": { "dateLog.dateOffice": Date.now(), "dateLog.dateProccessed": d, "signature.officeSignature": req.body.officeSignature },
            }, { returnOriginal: false })
            .exec();
    } catch (err) {
        return res
            .status(422)
            .json(err)
    }

    let notification;
    try{
        notification = new notificationModel({
            requestCode: req.body.requestID,
            contents:`Your Grade Completion Form by the office has been processed!`,
            receiver:{
                receiverID: mongoose.Types.ObjectId(officeUpdate.student.studentID),
                receiverName: officeUpdate.student.studentFullname,
            },
        })
        await notification.save();
    }catch(error){
        return console.log(error);
    }




    return res.status(201).json(officeUpdate);






}
//Get Requests for List Display
const getRequestForStudent = async (req, res) => {
    let searchFilter = { 'student.studentID': req.body.uID };

    if (req.body.requestStatus) {
        newStatus = { 'status': req.body.requestStatus }
        searchFilter = Object.assign(newStatus, searchFilter)
    }
    if (req.body.requestToDate) {
        newToDate = { 'dateLog.dateStudent': { '$gte': req.body.requestToDate } }
        searchFilter = Object.assign(newToDate, searchFilter)
    }
    if (req.body.requestFromDate) {
        newFromDate = { 'dateLog.dateStudent': { '$lte': req.body.requestFromDate } }
        searchFilter = Object.assign(newFromDate, searchFilter)
    }

    let getRequestStudent
    try {
        getRequestStudent = await requestModel
            .find(searchFilter);
    } catch (err) {
        return res
            .status(422)
            .json({ error: err, message: "Search Failed" })
    }
    return res.status(202).json(getRequestStudent);
}

const getRequestForFaculty = async (req, res) => {
    let searchFilter = { 'instructor.instructorID': req.body.uID };
    if (req.body.requestStatus) {
        newStatus = { 'status': req.body.requestStatus }
        searchFilter = Object.assign(newStatus, searchFilter)
    }
    if (req.body.requestToDate) {
        newToDate = { 'dateLog.dateStudent': { '$gte': req.body.requestToDate } }
        searchFilter = Object.assign(newToDate, searchFilter)
    }
    if (req.body.requestFromDate) {
        newFromDate = { 'dateLog.dateStudent': { '$lte': req.body.requestFromDate } }
        searchFilter = Object.assign(newFromDate, searchFilter)
    }
    let getRequestFaculty
    try {
        getRequestFaculty = await requestModel
            .find(searchFilter);
    } catch (err) {
        return res
            .status(422)
            .json({ error: err, message: "Search Failed" })
    }
    return res.status(201).json(getRequestFaculty);
}

const adminGetRequests = async (req, res) => {
    let searchFilter = {};
    if (req.body.requestStatus) {
        newStatus = { 'status': req.body.requestStatus }
        searchFilter = Object.assign(newStatus, searchFilter)
    }
    if (req.body.requestToDate) {
        newToDate = { 'dateLog.dateStudent': { '$gte': req.body.requestToDate } }
        searchFilter = Object.assign(newToDate, searchFilter)
    }
    if (req.body.requestFromDate) {
        newFromDate = { 'dateLog.dateStudent': { '$lte': req.body.requestFromDate } }
        searchFilter = Object.assign(newFromDate, searchFilter)
    }
    let getRequestFaculty
    try {
        if (req.body.filter) {
            getRequestFaculty = await requestModel
                .find({ status: req.body.filter });
        } else {
            getRequestFaculty = await requestModel
                .find(searchFilter);
        }

    } catch (err) {
        return res
            .status(422)
            .json({ error: err, message: "Search Failed" })
    }
    return res.status(201).json(getRequestFaculty);
}



exports.getRequestForFaculty = getRequestForFaculty;
exports.getRequestForStudent = getRequestForStudent;
exports.studentCreateRequest = studentCreateRequest;
exports.instructorRespondRequest = instructorRespondRequest;
exports.officeRespondRequest = officeRespondRequest;

exports.adminGetRequests = adminGetRequests;

