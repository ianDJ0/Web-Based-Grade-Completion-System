const uuid = require("uuid");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const requestModel = require("../models/user-model");
const { check, validationResult } = require("express-validator");
const { find } = require("../models/user-model");

const atlasUrl =
    "mongodb+srv://public-user:PHCrtQ2AuZAIcE6p@cluster0.c8pz2.mongodb.net/request?retryWrites=true&w=majority";
mongoose
    .connect(atlasUrl)
    .then(() => {
        console.log("Connected to Atlas");
    })
    .catch(() => {
        console.log("Connection Failed");
    });

const studentRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res
            .status(422)
            .json({ message: "Invalid inputs please enter the proper fields" });
    }
    
}