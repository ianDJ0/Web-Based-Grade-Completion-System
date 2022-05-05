const mongoose = require('mongoose');

const request = new mongoose.Schema({
    requestCode: { type: mongoose.Types.ObjectId, ref: "Request" },
    contents: { type: String, required: true },
    date:{type:Date, default:Date.now()},
    updater: { 
        updaterID:{type: String},
        updaterName:{type: String},
     },
    receiver: { 
        receiverID:{type: String, required: true},
        receiverName:{type: String, required: true},
     },
    seen:{type:Boolean, default:false}
}, {
    collection: 'Notification',
    versionKey: false
});

module.exports = mongoose.model('Notification', request)