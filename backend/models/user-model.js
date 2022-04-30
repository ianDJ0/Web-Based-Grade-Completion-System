const mongoose = require('mongoose');

const user = new mongoose.Schema({
    profilePicture:{type:String},
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    userType: { type: String, required: true },
    studentNumber: { type: String },
    yearAndSection: { type: String },
    birthday: { type: Date},
    image: { type: String, required: true }
}, {
    collection: 'User',
    versionKey: false
});

module.exports = mongoose.model('User', user)