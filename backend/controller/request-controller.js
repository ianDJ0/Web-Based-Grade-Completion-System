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
    const userData = JSON.parse(JSON.stringify(res.locals.user.userData));
    if (userData.userType !== "Student") {
        return res.status(403).json({ message: "Requesting with invalid user type" })
    }
    let result
    try {
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
        result = await studentRequest.save();
    } catch (error) {
        return res.json(error);
    }
    //generate notification
    let notification;
    try {
        notification = new notificationModel({
            requestCode: studentRequest._id,
            contents: `${req.body.studentFullname} has requested grade completion`,
            updater: {
                updaterID: mongoose.Types.ObjectId(req.body.studentID),
                updaterName: req.body.studentFullname,
            },
            receiver: {
                receiverID: mongoose.Types.ObjectId(req.body.instructorID),
                receiverName: req.body.instructorName,
            },
        })
        await notification.save();
    } catch (error) {
        return console.log(error);
    }
    return res.json({ new: result, notification: notification });

}

const getOneRequest = async (req, res) => {
    let request;
    try {
        request = await requestModel.findById(mongoose.Types.ObjectId(req.body.requestID));
    } catch (error) {
        return res.json(error);
    }
    return res.json(request);
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
            .json(err)
    }
    let instructorContents;
    if (req.body.grade > 3) {
        instructorContents = `${instructorUpdate.instructor.instructorName} has denied your request`
    } else {
        instructorContents = `${instructorUpdate.instructor.instructorName} has submitted your request to Office`
    }
    let notification;
    try {
        notification = new notificationModel({
            requestCode: req.body.requestID,
            contents: instructorContents,
            updater: {
                updaterID: mongoose.Types.ObjectId(instructorUpdate.instructor.instructorID),
                updaterName: instructorUpdate.instructor.instructorName,
            },
            receiver: {
                receiverID: mongoose.Types.ObjectId(instructorUpdate.student.studentID),
                receiverName: instructorUpdate.student.studentFullname,
            },
        })
        await notification.save();
    } catch (error) {
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
    try {
        notification = new notificationModel({
            requestCode: req.body.requestID,
            contents: `Your Grade Completion Form by the office has been processed!`,
            receiver: {
                receiverID: mongoose.Types.ObjectId(officeUpdate.student.studentID),
                receiverName: officeUpdate.student.studentFullname,
            },
        })
        await notification.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json(officeUpdate);
}
//get notification
const getUserNotifications = async (req, res) => {
    let getNotifications;
    try {
        getNotifications = await notificationModel
            .find({ 'receiver.receiverID': req.body.userID }).sort({ 'date': -1 });
    } catch (err) {
        return res
            .status(422)
            .json({ error: err, message: "Search Failed" })
    }
    return res.status(202).json(getNotifications);
}

//set notification to viewed
const viewNotification = async (req, res) => {
    try {
        viewNotif = await notificationModel
            .findByIdAndUpdate(req.body.notificationID, { seen: true });
    } catch (err) {
        return res
            .status(422)
            .json({ error: err, message: "Search Failed" })
    }
    return res.status(202).json(viewNotif);
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
            .find(searchFilter).sort({ 'dateLog.dateStudent': -1 });
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
            .find(searchFilter).sort({ 'dateLog.dateStudent': -1 });
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
        newToDate = { 'dateLog.dateStudent': { '$lte': req.body.requestToDate } }
        searchFilter = Object.assign(newToDate, searchFilter)
    }
    if (req.body.requestFromDate) {
        newFromDate = { 'dateLog.dateStudent': { '$gte': req.body.requestFromDate } }
        searchFilter = Object.assign(newFromDate, searchFilter)
    }
    if (req.body.filter) {
        filterSubmitted = { 'status': "SUBMITTED" }
        searchFilter = Object.assign(filterSubmitted, searchFilter)
    }
    if (req.body.requestFromDate && req.body.requestToDate) {
        delete searchFilter['dateLog.dateStudent']
        andDate = {
            '$and': [
                {'dateLog.dateStudent': { '$lte': req.body.requestToDate }},
                { 'dateLog.dateStudent': { '$gte': req.body.requestFromDate }},
            ]
        }
        searchFilter = Object.assign(andDate, searchFilter)
    }
    let getRequestFaculty
    try {
        getRequestFaculty = await requestModel
            .find(searchFilter).sort({ 'dateLog.dateStudent': -1 }).limit(req.body.requestEntries === "all" ? "" : parseInt(req.body.requestEntries));
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
exports.getUserNotifications = getUserNotifications;
exports.viewNotification = viewNotification;
exports.getOneRequest = getOneRequest;
exports.adminGetRequests = adminGetRequests;

