const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongooseTypeNumberEnums = require("mongoose-type-number-enums");
const STATUS = require("./contains/status.response");
const showRes = require("./library/message");
const jwt = require('jsonwebtoken');

const apiUserRouter = require("./routers/user.router");
const apiMenuRouter = require("./routers/menu.router");
const apiProductRouter = require("./routers/product.router");
const apiSizeRouter = require("./routers/size.router");
const apiAuthRouter = require("./routers/authenticate.router");
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
app.use("/", apiUserRouter.getAllUser)
app.use("/", apiUserRouter.createUser)
app.use("/", apiUserRouter.updateUser)
app.use("/", apiUserRouter.deleteUser)
app.use("/", apiUserRouter.checkLogin);
// app.use("/", apiUserRouter.updateRole);
/*==========END-USER=========*/
/*/////////////////////////////*/
/*============MENU===========*/
app.use("/", apiMenuRouter.createParentMenu)
app.use("/", apiMenuRouter.createSubMenu)
/*==========END-MENU=========*/
/*/////////////////////////////*/
/*============PRODUCT===========*/
app.use("/", apiProductRouter.createProduct)
app.use("/", apiProductRouter.getAllProduct)
app.use("/", apiProductRouter.deleteProductByCode)
app.use("/", apiProductRouter.updateProductByCode)
/*==========END-PRODUCT=========*/
/*/////////////////////////////*/
/*============SIZE===========*/
app.use("/", apiSizeRouter.createSize)

/*==========END-SIZE=========*/
app.listen(port, () => console.log("Server running at port " + port))