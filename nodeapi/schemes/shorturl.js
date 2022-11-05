const mongoose = require('mongoose')
const ShortUrlScheme = new mongoose.Schema({
  source: String,
  dest: String,
  detail: String,
  type: String,
  show: String
})

const ShortUrlUserScheme = new mongoose.Schema({
  user: String,
  pass: String
})

const ShortUrl = mongoose.model("ShortUrl", ShortUrlScheme)
const ShortUrlUser = mongoose.model("ShortUrlUser", ShortUrlUserScheme)

module.exports.ShortUrl = ShortUrl
module.exports.ShortUrlUser = ShortUrlUser