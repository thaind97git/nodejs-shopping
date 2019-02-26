const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongooseTypeNumberEnums = require("mongoose-type-number-enums");
const STATUS = require("./contains/status.response");
const $lib = require("./library/message");
const jwt = require('jsonwebtoken');

const apiUserRouter = require("./app/user/user.router");
const apiMenuRouter = require("./app/menu/menu.router");
const apiProductRouter = require("./app/product/product.router");
const apiSizeRouter = require("./app/size/size.router");
const apiAuthRouter = require("./app/authenticate/authenticate.router");
const apiColorRouter = require("./app/color/color.router");
const urlContain = require("./contains/url.contains");
const serverContain = urlContain.URL_SERVER

mongoose.connect(serverContain.SERVER_NAME)
new MongooseTypeNumberEnums().upgradeMongoose(mongoose);

const app = express();
app.use(cors());
const port = serverContain.SERVER_PORT;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", apiAuthRouter.authenticate);
app.use("/", apiAuthRouter.createAuth);



/*============USER===========*/
app.use("/", apiUserRouter)
/*==========END-USER=========*/
/*/////////////////////////////*/

/*============MENU===========*/
app.use("/", apiMenuRouter)
/*==========END-MENU=========*/
/*/////////////////////////////*/

/*============PRODUCT===========*/
app.use("/", apiProductRouter)
/*==========END-PRODUCT=========*/
/*/////////////////////////////*/

/*============SIZE===========*/
app.use("/", apiSizeRouter)
/*==========END-SIZE=========*/
/*/////////////////////////////*/

/*============COLOR===========*/
app.use("/", apiColorRouter)
/*/////////////////////////////*/
/*==========END_COLOR=========*/

app.listen(port, () => console.log("Server running at port " + port))