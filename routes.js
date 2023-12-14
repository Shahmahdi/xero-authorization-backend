"use strict";

const Router = require("koa-router");
const { getOrCreateAuth0User } = require("./controller/users");

const routers = new Router();

routers.post("/user/xero/auth0", getOrCreateAuth0User);

module.exports = routers;
