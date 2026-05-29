const { Sticker, StickerTypes } = require("wa-sticker-formatter")
const { downloadMediaMessage } = require("../../lib/downloader")

module.exports = {
  name: "sticker",
  aliases: ["s", "stiker"],
  run: async ({ sock, msg }) => {
    try {
      const buffer = await downloadMediaMessage(msg, false)

      const sticker = new Sticker(buffer, {
        pack: "Shen Bot",
        author: "Shen",
        type: StickerTypes.FULL,
        quality: 80
      })

      const stickerBuffer = await sticker.toBuffer()

      await sock.sendMessage(msg.from, {
        sticker: stickerBuffer
      }, { quoted: msg.raw })

    } catch (e) {
      await msg.reply("Reply/kirim gambar dulu pakai caption !sticker")
    }
  }
}
