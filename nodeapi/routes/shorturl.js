const express = require('express')
const md5 = require("md5")

const {ShortUrl, ShortUrlUser} = require("../schemes/shorturl")

const router = express.Router()

const insert = async (source, dest, detail, type, show) => {
    try {
        await ShortUrl.insertMany([{source, dest, detail, type, show}])
        return true
    } catch(e) {
        return false
    }
}

const list = async (mode) => {
    try {
        let result = []
        if (mode == "root") {
            result = await ShortUrl.find({}, {_id: 0, __v: 0})
            result = result
        } else {
            result = await ShortUrl.find({show: "1"}, {_id: 0, __v: 0})
        }
        return result
    } catch(e) {
        return false
    }
}

const update = async (source, dest, detail, type, show) => {
    try {
        await ShortUrl.updateOne({source}, {$set: {dest, detail, type, show}})
        return true
    } catch(e) {
        return false
    }
}

const verify = async (user, pass) => {
    let record = await ShortUrlUser.find({ user, pass: md5(pass) }) //find function will return an array
    if (record.length == 1) { //if array length equeas one means ok
        return true
    } else {
        return false
    }
}
router.use((req, res, next) => {
    if (req.path != "/login" && req.path != "/list" && req.path != "/cookie" && req.session.user === undefined) {
        res.json({error: {msg: "UnAuthenticated"}})
    } else {
        next()
    }
})

router.route("/login")
    .post(async (req, res) => {
        const { user, pass } = req.body
        if (user && pass) {
            let result = await verify(user, pass)
            if (result) {
                req.session.user = user
                return res.json({success: {"msg": "Authenticated Success"}, user})
            }
        }
        return res.json({error: {"msg": "Authenticated Failed"}})
    })
    .get((req, res) => {
        if (req.session.user) {
            res.json({success: {msg: "You Have Already Authenticated", user: req.session.user}})
        } else {
            res.json({error: {msg: "Wrong Method"}})
        }
    })

router.route("/insert")
    .post(async (req, res) => {
        const { source, dest, detail, type, show } = req.body
        if (source !== undefined && dest !== undefined && detail !== undefined && type !== undefined && show !== undefined) {
            if (show !== "0" && show !== "1") {
                return res.json({error: {msg: "Parameter 'show' should set '0' or '1'"}})
            }
            const result = await insert(source, dest, detail, type, show)
            if (result) {
                res.json({success: {msg: "Insert Successfully"}})
            } else {
                res.json({error: {msg: "Insert Failed Due To Internal Error"}})
            }
        } else {
            res.json({error: {msg: "Missing Parameters"}})
        }
    })
    .get((req, res) => {
        res.json({error: {msg: "Method not allowed"}})
    })

router.route("/list")
    .get(async (req, res) => {
        let mode = "guest"
        if (req.session.user) {
            mode = "root"
        }
        let result = await list(mode)
        if (result) {
            res.json({success: {msg: "List Successfully"}, mode, data: result})
        } else {
            res.json({error: {msg: "List Failed Due To Internal Error"}})
        }
    })

router.route("/update")
    .post(async (req, res) => {
        const { source, dest, detail, type, show } = req.body
        if (source !== undefined && dest !== undefined && detail !== undefined && type !== undefined && show !== undefined) {
            if (show !== "0" && show !== "1") {
                return res.json({error: {msg: "Parameter 'show' should set '0' or '1'"}})
            }
            let result = await update(source, dest, detail, type, show)
            if (result) {
                return res.json({success: {msg: "Update Successfully"}})
            } else {
                return res.json({error: {msg: "Update Failed Due To Internal Error"}})
            }
        } else {
            return res.json({error: {msg: "Missing Parameter"}})
        }
    })
    .get((req, res) => {
        res.json({error: {msg: "Method not allowed"}})
    })

router.get("/logout", (req, res) => {
    req.session.destroy((e) => {
        res.clearCookie("sessionID")
        res.json({success: {msg: "Logout Successfully"}})
    })
})

module.exports = router