const express = require('express')
const { ShortUrl } = require("../schemes/shorturl")

const find = async (dest) => {
  try {
    let result = []
    result = await ShortUrl.find({dest}, {_id: 0, __v: 0})
    result = result
    return result
  } catch(e) {
    return false
  }
}

const router = express.Router()
router.get("/*", async (req, res) => {
  let result = await find(req.path.slice(1))
  if (result.length !== 0) {
    res.redirect(result[0].source)
  } else {
    res.json({error: {msg: "Record Not Found"}})
  }
})

module.exports = router