const express = require("express");
const userrouter = express.Router();
const { validateSignup } = require("../utils/validator");
const User = require("../models/user");
const { auth } = require("../utils/middleware");
const { sendResponse } = require("../utils/utils");

// General user controllers
userrouter.get("/", auth, async(req, res) => {
    try {
        const users = await User.find();
        sendResponse(res, 200, users);
    } catch (err) {
        sendResponse(res, 500, null, "Unexpected error!");
    }
});

userrouter.get("/:userId", auth, async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        sendResponse(res, 200, user);
    } catch (err) {
        sendResponse(res, 500, null, "Unexpected error!");
    }
});
userrouter.post("/", auth, async(req, res) => {
    // Check Validation for User
    const { error } = validateSignup(req.body);
    if (error) {
        return sendResponse(res, 400, null, { message: error.details[0].message });
    }
    const user = new User({
        Doctor: req.body.Doctor,
        Patient: req.body.Patient,
        Comment: req.body.Comment,
        Rating: req.body.Rating,
    });

    try {
        const savedUser = await user.save();
        sendResponse(res, 201, savedUser);
    } catch (err) {
        sendResponse(res, 500, null, "Unexpected error!");
    }
});

module.exports = userrouter;