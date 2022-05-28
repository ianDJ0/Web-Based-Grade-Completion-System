const mongoose = require('mongoose');

const homepage = new mongoose.Schema({
    logo: { type: String },
    name: { type: String },
    vision: { type: String },
    mission: { type: String },
    goals: { type: String },
    objective: { type: String },
}, {
    collection: 'Home',
    versionKey: false
});

module.exports = mongoose.model('Home', homepage)