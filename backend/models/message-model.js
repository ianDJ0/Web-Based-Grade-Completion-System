const mongoose = require('mongoose');

const message = new mongoose.Schema({
    sender: { 
        senderID:{type: mongoose.Types.ObjectId, ref: "User"} ,
        senderName:{type: String} 
    },
    receiver: { type: mongoose.Types.ObjectId, ref: "User" },
    contents: { type: String, required: true },
    date:{type:Date, default:Date.now()},
}, {
    collection: 'Message',
    versionKey: false
});

module.exports = mongoose.model('Message', message)