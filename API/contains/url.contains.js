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
const CREATE_AUTHENTICATE = SERVER_PATH + "/user/authenticate/create";
const CHECK_AUTH = SERVER_PATH + "/user/authenticate";
/*============USER================*/
const ALL_USER = SERVER_PATH + "/user/users";
const CREATE_USER = SERVER_PATH + "/user/create";
const UPDATE_USER = SERVER_PATH + "/user/update/:username";
// const UPDATE_ROLE = SERVER_PATH + "/user/:username"
const DELETE_USER = SERVER_PATH + "/user/delete/:username";
/*============MENU================*/
const CREATE_PARENT_MENU = SERVER_PATH + "/pmenu/create";
const CREATE_SUB_MENU = SERVER_PATH + "/smenu/create";

/*============PRODUCT================*/
const CREATE_PRODUCT = SERVER_PATH + "/product/create";
const ALL_PRODUCT = SERVER_PATH + "/product/products";
const GET_PRODUCT_ID = SERVER_PATH + "/product/get-byid/:_id";
const GET_PRODUCT_BYCODE = SERVER_PATH + "/product/get-bycode/:productCode";
const DELETE_PRODUCT_BYCODE = SERVER_PATH + "/product/delete-bycode/:productCode"; 
const UPDATE_PRODUCT_BYCODE = SERVER_PATH + "/product/update-bycode/:productCode";
const GET_SIZE_BYCODE = SERVER_PATH + "/product/get-sizes/:productCode";

/*============SIZES================*/
const CREATE_SIZE = SERVER_PATH + "/size/create";
const ALL_SIZE = SERVER_PATH + "/size/sizes";
const GET_SIZE_BYID = SERVER_PATH + "/size/get-byid/:_id";
const GET_SIZE_BYNAME = SERVER_PATH + "/size/get-byname/:name";
const DELETE_SIZE_BYID = SERVER_PATH +"/size/delete-byid/:_id";
const DELETE_SIZE_BYNAME = SERVER_PATH +"/size/delete-byname/:name";
const UPDATE_SIZE_BYID = SERVER_PATH + "/size/update-byid/:_id";
const UPDATE_SIZE_BYNAME = SERVER_PATH + "/size/update-byname/:name";
/*============COLORS================*/
const CREATE_COLOR = SERVER_PATH + "/color/create";
const ALL_COLOR = SERVER_PATH + "/color/colors";
const GET_COLOR_BYID = SERVER_PATH + "/color/get-byid/:_id";
const GET_COLOR_BYNAME = SERVER_PATH + "/color/get-byname/:name";
const UPDATE_COLOR_BYID = SERVER_PATH + "/color/update-byid/:_id";
const UPDATE_COLOR_BYNAME = SERVER_PATH + "/color/update-byname/:name";
const DELETE_COLOR_BYID = SERVER_PATH + "/color/delete-byid/:_id";
const DELETE_COLOR_BYNAME = SERVER_PATH + "/color/delete-byname/:name";
module.exports.URL_SERVER = {
    SERVER_NAME,
    SERVER_PATH,
    SERVER_PORT
};
module.exports.URL_USER = {
    CHECK_LOGIN,
    CREATE_AUTHENTICATE,
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
    GET_PRODUCT_BYCODE,
    GET_PRODUCT_ID
};
module.exports.URL_MENU = {
    CREATE_PARENT_MENU,
    CREATE_SUB_MENU
};
module.exports.URL_SIZE = {
    ALL_SIZE,
    GET_SIZE_BYID,
    GET_SIZE_BYNAME,
    CREATE_SIZE,
    UPDATE_SIZE_BYID,
    UPDATE_SIZE_BYNAME,
    DELETE_SIZE_BYID,
    DELETE_SIZE_BYNAME
}
module.exports.URL_COLOR = {
    ALL_COLOR,
    GET_COLOR_BYID,
    GET_COLOR_BYNAME,
    CREATE_COLOR,
    UPDATE_COLOR_BYID,
    UPDATE_COLOR_BYNAME,
    DELETE_COLOR_BYID,
    DELETE_COLOR_BYNAME
}