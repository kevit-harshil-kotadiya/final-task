import Config from "./config-test";
import ApplicationConfig from "../src/application.routes";
import * as bodyParser from "body-parser";
const mongoose = require("mongoose");
const express = require("express");
async function f() {
  await mongoose.connect(Config.mongodb.url);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
}
f();

export const app = express();

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());

ApplicationConfig.registerRoute(app);
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4comment below lines and run npm test to start testing

////$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export default app;
