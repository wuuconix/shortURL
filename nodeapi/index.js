const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const shortUrlRouter = require('./routes/shorturl')
const JumpRouter = require('./routes/jump')
const mongoose = require('mongoose')
const config = require("../config/node") //引入你的配置文件

mongoose.connect(config.mongoURI)

const app = express()
app.use(session({name: "sessionID", secret: config.sessionSecret, resave: true, saveUninitialized: false, cookie: { httpOnly: false, maxAge: null }}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/shorturl", shortUrlRouter)
app.use("/jump", JumpRouter)

app.listen(10000, () => {
  console.log(`api server running in ${config.apiURI}`);
});
