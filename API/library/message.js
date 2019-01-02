module.exports.showResponse = (status, isSuccess, message, data ) => {
    return {
        status: status,
        success: isSuccess,
        message: message,
        data: data
    }
}
module.exports.showToken = (status, isSuccess, message, token ) => {
    return {
        status: status,
        success: isSuccess,
        message: message,
        token: token
    }
}