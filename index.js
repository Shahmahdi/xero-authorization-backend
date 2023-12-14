"use strict";

require("dotenv").config();

const Koa = require("koa");
const router = require("./routes");
const koaBody = require("koa-body");

const app = new Koa();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
app.listen(4000, () => {
  console.log(`API server listening on 4000`);
});

// Expose app
module.exports = app;
