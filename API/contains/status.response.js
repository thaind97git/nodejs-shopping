const STATUES = {
    OK : 200,
    NOTFOUND: 404,
    DUPLICATE: 422,
    MISSING_DATA: 400,
    FORBIDDEN: 403,
    ERROR: 500,
    CONFLIG: 409
}

const MESSAGES = {
    SUCCESS: 'Success !',
    FAIL: 'Fail !',
    PASSWORD_WRONG: 'Password wrong !',
    EMPTY:'Empty Response !',
    
    CREATE_SUCCESS: 'Create Success !',
    DELETE_SUCCESS: 'Delete Success !',
    UPDATE_SUCCESS: 'Update Success !',
    CREATE_FAIL: 'Create Fail !',
    DELETE_FAIL: 'Delete Fail !',
    UPDATE_FAIL: 'Update Fail !',

    CANNOT_FIND_PRODUCT: 'Can not find product: ',
    CANNOT_FIND_SIZE: 'Can not find size: ',
    CANNOT_FIND_COLOR: 'Can not find color: ',
    CANNOT_FIND_SUBMENU: 'Can not find sub menu: ',
    CANNOT_FIND_PARENTMENU: 'Can not find parent menu: ',
    CANNOT_FIND_USER: 'Can not find user: ',

    CANNOT_UPDATE: 'Can not update',

    MISSING_DATA: 'Missing data !',

    //*****Authenticate*****//
    AUTHENTICATE_FAIL: 'Authenticate fail !',
    AUTHENTICATE_SUCCESS: 'Authenticate success !',
    NOTOKEN_PROVIDED: 'No token provided !',
}

module.exports.STATUS = STATUES;

module.exports.MESSAGE = MESSAGES;