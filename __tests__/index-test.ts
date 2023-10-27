import Config from "./config-test";
import ApplicationConfig from "../src/application.routes";
import * as bodyParser from "body-parser";
const mongoose = require("mongoose");
const express = require("express");
async function f() {
  await mongoose.connect(Config.mongodb.url);
}
f();

export const app = express();


app.use(express.json());

ApplicationConfig.registerRoute(app);


export default app;
