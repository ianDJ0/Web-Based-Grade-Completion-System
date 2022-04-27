const mongoose = require('mongoose');

const request = new mongoose.Schema({
    subject: { type: String, required: true },
    incompletePeriod: { type: String, required: true },
    incompleteYear: { type: String, required: true },
    reason: { type: String, required: true },
    grade: { type: String},
    deanName: { type: String },
    student: {
        studentID: { type: mongoose.Types.ObjectId, ref: "User" },
        studentFullname: { type: String, required: true },
        studentNumber: { type: String, required: true },
        studentYearAndSection: { type: String, required: true },
    },
    instructor: {
        instructorID: { type: mongoose.Types.ObjectId, ref: "Instructor" },
        instructorName: { type: String }
    },
    signature: {
        studentSignature: { type: String },
        instructorSignature: { type: String},
        officeSignature: { type: String }
    },
    dateLog: {
        dateStudent: { type: Date, default: Date.now() },
        dateInstructor: { type: Date },
        dateOffice: { type: Date },
    }
}, {
    collection: 'Request',
    versionKey: false
});

module.exports = mongoose.model('Request', request)