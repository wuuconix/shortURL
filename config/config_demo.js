//该文件用来向vue和node提供一些隐秘的配置信息
//你需要按你的情况设置好后把此文件更改为 config.js
module.exports = {
    mongoURI: "mongodb+srv://user:pass@cluster0.rbkpw.mongodb.net/someone?retryWrites=true&w=majority",
    sessionSecret: "sessionSecret",
    baseURI: "http://127.0.0.1/",
    apiURI: "http://127.0.0.1/api"
}