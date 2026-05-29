const { downloadMediaMessage } = require("../../lib/downloader")

module.exports = {
  name: "sticker",
  aliases: ["s", "stiker"],
  run: async ({ sock, msg }) => {
    try {
      const buffer = await downloadMediaMessage(msg, false)

      await sock.sendMessage(msg.from, {
        sticker: buffer
      }, { quoted: msg.raw })

    } catch (e) {
      console.error(e)
      await msg.reply("Kirim/reply gambar dulu pakai !sticker")
    }
  }
}
