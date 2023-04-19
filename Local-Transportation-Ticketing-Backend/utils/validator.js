const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

// Validate User Signup
const validateSignup = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required(),
        paswword: Joi.string().min(3).required(),
    }).allow();
    return schema.validate(data);
};

// Validate User Login
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
    }).allow();
    return schema.validate(data);
};


// Booking Validation
const validateBooking = (data) => {
    const schema = Joi.object({
        user: Joi.string().min(3).max(20).required(),
        schedule: Joi.string().min(3).max(20).required(),
        numSeats: Joi.number().min(0).max(150).required(),
        class: Joi.string().min(4).max(6).required(),
        status: Joi.number().min(0).max(150).required(),
        dateBooked: Joi.string().min(2).max(3).required(),
    }).allow();
    return schema.validate(data);
};

// Payment Validation
const validatePayment = (data) => {
    const schema = Joi.object({
        booking: Joi.string().min(3),
        amount: Joi.string().min(4).max(6).required(),
        status: Joi.number().min(0).max(150).required(),
        datePaid: Joi.string().min(2).max(3).required(),
    }).allow();
    return schema.validate(data);
};

// Schedule Validation
const validateSchedule = (data) => {
    const schema = Joi.object({
        FirstName: Joi.string().min(3).max(20).required(),
        LastName: Joi.string().min(3).max(20).required(),
        Image: Joi.string().min(3),
        Gender: Joi.string().min(4).max(6).required(),
        Age: Joi.number().min(0).max(150).required(),
        BloodType: Joi.string().min(2).max(3).required(),
    }).allow();
    return schema.validate(data);
};

// Transportation Validation
const validateTransportation = (data) => {
    const schema = Joi.object({
        transportation: Joi.string().min(3),
        departureTime: Joi.string().min(4).max(6).required(),
        arrivalTime: Joi.number().min(0).max(150).required(),
        fare: Joi.string().min(2).max(3).required(),
    }).allow();
    return schema.validate(data);
};


// Validation SignUp
module.exports.validateSignup = validateSignup;

// Validation Login
module.exports.validateLogin = validateLogin;

// Validation Booking
module.exports.validateBooking = validateBooking;

// Validation Payment
module.exports.validatePayment = validatePayment;

// Validation Schedule
module.exports.validateSchedule = validateSchedule;

// Validation Transportation
module.exports.validateTransportation = validateTransportation;
