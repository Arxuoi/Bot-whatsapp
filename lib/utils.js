const crypto = require("crypto")

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function runtime(seconds) {
  seconds = Number(seconds)

  const d = Math.floor(seconds / 86400)
  const h = Math.floor(seconds / 3600) % 24
  const m = Math.floor(seconds / 60) % 60
  const s = Math.floor(seconds) % 60

  return `${d}d ${h}h ${m}m ${s}s`
}

function randomFileName(ext = "") {
  return crypto.randomBytes(8).toString("hex") + ext
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

module.exports = {
  sleep,
  runtime,
  randomFileName,
  pickRandom
}
