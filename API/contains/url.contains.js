const HTTP = "http://";
const PORT = "3000";
const SERVER_DB_NAME = "mongodb";
const SERVER_IP = "://localhost";
const SERVER_PATH = "/jdn97";
const DB_NAME = "/shopping";
const SERVER_CONFIG = "mongodb://localhost/shopping";

const SERVER_NAME = SERVER_CONFIG;
const SERVER_PORT = PORT;

const CHECK_LOGIN = SERVER_PATH + "/user/login"
const AUTHENTICATE = SERVER_PATH + "/authenticate";
const CHECK_AUTH = SERVER_PATH + "/user/authenticate";
/*============USER================*/
const ALL_USER = SERVER_PATH + "/user/users";
const CREATE_USER = SERVER_PATH + "/user/create";
const UPDATE_USER = SERVER_PATH + "/user/:username";
// const UPDATE_ROLE = SERVER_PATH + "/user/:username"
const DELETE_USER = SERVER_PATH + "/user/delete/:username";
/*============MENU================*/
const CREATE_PARENT_MENU = SERVER_PATH + "/pmenu/create";
const CREATE_SUB_MENU = SERVER_PATH + "/smenu/create";

/*============PRODUCT================*/
const CREATE_PRODUCT = SERVER_PATH + "/product/create";
const ALL_PRODUCT = SERVER_PATH + "/product/products";
const DELETE_PRODUCT_BYCODE = SERVER_PATH + "/product/delete/:productCode";
const UPDATE_PRODUCT_BYCODE = SERVER_PATH + "/product/update/:productCode";
const GET_SIZE_BYCODE = SERVER_PATH + "/product/get-sizes/:productCode";
const GET_PRODUCT_BYCODE = SERVER_PATH + "/product/get-productbycode/:productCode";
/*============SIZE================*/
const CREATE_SIZE = SERVER_PATH + "/size/create";

module.exports.URL_SERVER = {
    SERVER_NAME,
    SERVER_PATH,
    SERVER_PORT
};
module.exports.URL_USER = {
    CHECK_LOGIN,
    AUTHENTICATE,
    CHECK_AUTH,
    ALL_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    // UPDATE_ROLE
};
module.exports.URL_PRODUCT = {
    CREATE_PRODUCT,
    ALL_PRODUCT,
    DELETE_PRODUCT_BYCODE,
    UPDATE_PRODUCT_BYCODE,
    GET_SIZE_BYCODE,
    GET_PRODUCT_BYCODE
};
module.exports.URL_MENU = {
    CREATE_PARENT_MENU,
    CREATE_SUB_MENU
};
module.exports.URL_SIZE = {
    CREATE_SIZE
}