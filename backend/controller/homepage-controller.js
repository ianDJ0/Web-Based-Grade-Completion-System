const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const homepageModel = require("../models/homepage-model");
const { check, validationResult } = require("express-validator");


const atlasUrl =
    "mongodb+srv://public-user:PHCrtQ2AuZAIcE6p@cluster0.c8pz2.mongodb.net/user?retryWrites=true&w=majority";
mongoose
    .connect(atlasUrl)


const editHomepage = async (req,res)=>{

    let editHomepage
    try {
        editHomepage = await homepageModel.findByIdAndUpdate("62822856f91599656ee16da8",{
            vision:req.body.vision,
            mission:req.body.mission,
            goals:req.body.goals,
            objective:req.body.objective,           
        });
    } catch (err) {
        return res
            .status(422)
            .json({ error: err, message: "Search Failed" })
    }
    return res.status(201).json(editHomepage);
}

const getHome = async (req,res)=>{

    let getHomepage
    try {
        getHomepage = await homepageModel.findById("62822856f91599656ee16da8");
    } catch (err) {
        return res
            .status(422)
            .json({ error: err, message: "Search Failed" })
    }
    return res.status(201).json(getHomepage);
}

exports.editHomepage = editHomepage;
exports.getHome = getHome