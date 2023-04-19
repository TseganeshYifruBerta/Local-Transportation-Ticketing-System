const sendResponse = (res, statusCode, data, err = null) => {
    res.status(statusCode).json({
        data: data,
        error: err
    })
}

module.exports.sendResponse = sendResponse;