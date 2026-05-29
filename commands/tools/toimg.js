const sharp = require("sharp")
const { downloadMediaMessage } = require("../../lib/downloader")

module.exports = {
  name: "toimg",
  aliases: ["toimage"],
  run: async ({ sock, msg }) => {
    try {
      const buffer = await downloadMediaMessage(msg, false)

      const image = await sharp(buffer)
        .png()
        .toBuffer()

      await sock.sendMessage(msg.from, {
        image,
        caption: "Done."
      }, { quoted: msg.raw })

    } catch (e) {
      await msg.reply("Reply sticker dulu pakai !toimg")
    }
  }
}
