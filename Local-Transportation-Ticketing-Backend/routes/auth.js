const express = require("express");
const authrouter = express.Router();
const jwt = require("jsonwebtoken");
const { validateSignup, validateLogin } = require("../utils/validator");
const User = require("../models/user");
const { sendResponse } = require("../utils/utils");

authrouter.post("/signup", async(req, res) => {
    // Check Validation for signup user
    const { error } = validateSignup(req.body);
    if (error) {
        return sendResponse(res, 400, null, { message: error.details[0].message });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ Email: req.body.Email });
    if (existingUser) {
        return sendResponse(res, 400, null, { message: "User already exists" });
    }

    // Create User
    const user = new User({
        Email: req.body.Email,
        Password: req.body.Password,
    });

    // Save User to database
    try {
        const savedUser = await user.save();
        sendResponse(res, 201, savedUser);
    } catch (err) {
        sendResponse(res, 500, null, "Unexpected error!");
    }
});

authrouter.post("/login", async(req, res) => {
    // Check Validation for login user
    const { error } = validateLogin(req.body);
    if (error) {
        return sendResponse(res, 400, null, { message: error.details[0].message });
    }

    // check if the UserName exists
    const existsUser = await User.findOne({ Email: req.body.Email }).select(
        "+Password"
    );
    if (!existsUser) {
        return sendResponse(res, 400, null, { message: "User Doesn't exist" });
    }

    // check if the User is Active
    if (!existsUser.IsActive) {
        return sendResponse(res, 400, null, { message: "User is Not active" });
    }

    //

    const validPass = await existsUser.comparePassword(
        req.body.Password,
        existsUser.Password
    );
    if (!validPass) {
        return sendResponse(res, 400, null, { message: "Invalid Credentials" });
    }

    // Create token
    const token = jwt.sign({ _id: existsUser._id, Role: existsUser.Role },
        process.env.TOKEN_SECRET
    );

    try {
        sendResponse(res.header("auth-token", token), 200, {
            user: existsUser,
            token: token,
        });
    } catch (err) {
        sendResponse(res, 500, null, "Unexpected error!");
    }
});

module.exports = authrouter;