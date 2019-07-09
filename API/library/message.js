const STATUS = require(`../contains/status.response`);
const $S_CODE = STATUS.STATUS;
const $S_MESSAGE = STATUS.MESSAGE;

const showResponse = (status, isSuccess, message, data, count ) => {
    return {
        status: status,
        success: isSuccess,
        message: message,
        data: data,
        count: count || 0
    }
}
const showToken = (status, isSuccess, message, token ) => {
    return {
        status: status,
        success: isSuccess,
        message: message,
        token: token
    }
};

/**
 * Function response catch_
 * Use for catch in tryCatch
 * @param {Object} response
 * @param {string} error
 * @returns {Object}
 */
const catchFunc = (response, error) => {
    return response.status($S_CODE.ERROR)
        .json({
            status: $S_CODE.ERROR,
            success: false,
            message: `Error Catch: ${error}`,
            data: null
        });
}

/**
 * Function response when not found
 * @param {Object} response
 * @param {String} name
 * @ If param `name` is `undefinded` => response message is `Empty Response !`
 * @ If param `name` is `definded` => response message is `Can not find ${name}`
 */
const notfoundFunc = (response, name) => {
    return response.status($S_CODE.NOTFOUND)
        .json({
            status: $S_CODE.NOTFOUND,
            success: false,
            message: name ? `Can not find ${name}` : $S_MESSAGE.EMPTY,
            data: null
        });
}

/**
 * Function response when error
 * @param {Object} response
 * @param {String} error
 * @param {String} type
 * @ If type === `undefinded`. message response is `Error : ${error}`
 * @ If type === `duplicate`. This function will return with code `DUPLICATE` and message error and message = `error`
 * @ If type === `required`. This function will return with code `MISSING_DATA` and message error and message = `error`
 */
const errorFunc = (response, error, type) => {
    let text = `Error : ${error}`;
    let code = $S_CODE.ERROR;
    if (type) {
        if (type.toLowerCase() === 'duplicate') {
            text = error;
            code = $S_CODE.DUPLICATE
        }
        if (type.toLowerCase() === 'required') {
            text = error;
            code = $S_CODE.MISSING_DATA
        }
    }
    return response.status(code)
        .json({
            status: code,
            success: false,
            message: text,
            data: null
        });
}

/**
 * Function response when success
 * @param {Object} response
 * @param {any} data
 * @param {String} type (`Update` || `Create` || `Delete`) 
 * @ If type === `undefinded` => message response is `Success !`
 * @ If type === `Update` => message response is `Update Success !`
 * @ If type === `Create` => message response is `Create Success !`
 * @ If type === `Delete` => message response is `Delete Success !`
 */
const successFunc = (response, data, type) => {
    let r = $S_MESSAGE.SUCCESS;
    if (type) {
        if (type.toLowerCase() === 'update') {
            r = $S_MESSAGE.UPDATE_SUCCESS;
        }
        if (type.toLowerCase() === 'create') {
            r = $S_MESSAGE.CREATE_SUCCESS;
        }
        if (type.toLowerCase() === 'delete') {
            r = $S_MESSAGE.DELETE_SUCCESS;
        }
    }
    return response.status($S_CODE.OK)
        .json({
            status: $S_CODE.OK,
            success: true,
            message: r,
            data: data || null
        });
}

/**
 * Function response when fail
 * @param {Object} response
 * @param {any} data
 * @param {String} type (`Update` || `Create` || `Delete`) 
 * @ If type === `undefinded` => message response is `Fail !`
 * @ If type === `Update` => message response is `Update Fail !`
 * @ If type === `Create` => message response is `Create Fail !`
 * @ If type === `Delete` => message response is `Delete Fail !`
 */
const failFunc = (response, data, type) => {
    let r = $S_MESSAGE.FAIL;
    if (type) {
        if (type.toLowerCase() === 'update') {
            r = $S_MESSAGE.UPDATE_FAIL;
        }
        if (type.toLowerCase() === 'create') {
            r = $S_MESSAGE.CREATE_FAIL;
        }
        if (type.toLowerCase() === 'delete') {
            r = $S_MESSAGE.DELETE_FAIL;
        }
    }
    return response.status($S_CODE.CONFLIG)
        .json({
            status: $S_CODE.CONFLIG,
            success: false,
            message: r,
            data: data
        });
}

module.exports = {
    showResponse,
    showToken,
    catchFunc,
    notfoundFunc,
    errorFunc,
    successFunc,
    failFunc
}