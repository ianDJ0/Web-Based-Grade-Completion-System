const mongoose = require('mongoose');

const user = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    userType: { type: String, required: true },
    studentNumber: { type: String },
    yearAndSection: { type: String },
    dateRegistered: { type: Date, default: Date.now() }

}, {collection:'User',
versionKey: false
});

module.exports = mongoose.model('User', user)