const { downloadContentFromMessage } = require("@whiskeysockets/baileys")
const fs = require("fs")
const path = require("path")
const { randomFileName } = require("./utils")

async function downloadMediaMessage(msg, save = true) {
  const message = msg.message || msg.raw?.message

  const type = Object.keys(message || {})[0]
  const media = message[type]

  if (!media) throw new Error("Media tidak ditemukan")

  let stream

  if (type === "imageMessage") {
    stream = await downloadContentFromMessage(media, "image")
  } else if (type === "videoMessage") {
    stream = await downloadContentFromMessage(media, "video")
  } else if (type === "stickerMessage") {
    stream = await downloadContentFromMessage(media, "sticker")
  } else {
    throw new Error("Tipe media belum support")
  }

  let buffer = Buffer.from([])

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }

  if (!save) return buffer

  if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp")

  const ext =
    type === "imageMessage" ? ".jpg" :
    type === "videoMessage" ? ".mp4" :
    ".webp"

  const filePath = path.join("./tmp", randomFileName(ext))

  fs.writeFileSync(filePath, buffer)

  return filePath
}

module.exports = {
  downloadMediaMessage
}
