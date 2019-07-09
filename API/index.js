const express = require("express");
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongooseTypeNumberEnums = require("mongoose-type-number-enums");

const apiUserRouter = require("./app/user/user.router");
const apiMenuRouter = require("./app/menu/menu.router");
const apiProductRouter = require("./app/product/product.router");
const apiSizeRouter = require("./app/size/size.router");
const apiAuthRouter = require("./app/authenticate/authenticate.router");
const apiColorRouter = require("./app/color/color.router");
const urlContain = require("./contains/url.contains");
const apiRedisRouter = require("./app/redis/redis.router");
const serverContain = urlContain.URL_SERVER

mongoose.connect(serverContain.SERVER_NAME)
new MongooseTypeNumberEnums().upgradeMongoose(mongoose);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup({}));
// app.use('/', swaggerUi.serve);
// app.get('/', swaggerUi.setup({}));

app.use(cors());
const port = serverContain.SERVER_PORT;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", apiAuthRouter.authenticate);
app.use("/", apiAuthRouter.createAuth);


app.use("/", apiRedisRouter)

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