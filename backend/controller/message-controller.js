const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const messageModel = require("../models/message-model");
const { check, validationResult } = require("express-validator");

const atlasUrl =
    "mongodb+srv://public-user:PHCrtQ2AuZAIcE6p@cluster0.c8pz2.mongodb.net/user?retryWrites=true&w=majority";
mongoose
    .connect(atlasUrl)

const sendMessage = async (req, res) => {
    let message, newMessage;

    try {
        message = new messageModel({
            sender: {
                senderID: req.body.senderID,
                senderName: req.body.senderName
            },
            receiver: {
                receiverID: req.body.receiverID,
                receiverName: req.body.receiverName
            },
            contents: req.body.contents
        })
        newMessage = await message.save();
    } catch (err) {
        console.log(err)
    }
    res.json(newMessage);
};

const getLatestMessages = async (req, res) => {
    let getLatest;

    try {
        getLatest = await messageModel.find({ '$or': [{ "sender.senderID": req.body.currentUserID }, { "receiver.receiverID": req.body.currentUserID }] }).sort({ "date": -1 })
    } catch (err) {
        console.log(err)
    }
    let filt = '';


    let latestFiltered = getLatest.filter(message => {
        if (filt.search(message.sender.senderID) === -1 || filt.search(message.receiver.receiverID) === -1) {
            filt = filt.concat("++", message.sender.senderID)
            filt = filt.concat("++", message.receiver)
            return true
        }
        return false
    });
    res.json(latestFiltered);
}

const getMessages = async (req, res) => {
    let allMessages;
    try {
        allMessages = await messageModel.find(
            {
                "$and": [{
                    '$or': [{ 'sender.senderID': req.body.currentUserID }, { "receiver.receiverID": req.body.currentUserID }]
                },
                { '$or': [{ 'sender.senderID': req.body.partnerID }, { "receiver.receiverID": req.body.partnerID }] }]
            },
        ).sort({ "date": 1 })
    } catch (err) {
        console.log(err)
    }
    res.json(allMessages);
}


exports.sendMessage = sendMessage;
exports.getLatestMessages = getLatestMessages;
exports.getMessages = getMessages
