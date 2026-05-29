const { hd } = require("../../lib/api")

module.exports = {
  name: "hd",
  aliases: ["upscale", "upscaler"],
  run: async ({ sock, msg, args }) => {
    const imageUrl = args[0]
    const set = args[1] || "2"

    if (!imageUrl) {
      return msg.reply(
        "Masukin URL gambar dulu.\nContoh: !hd https://contoh.com/gambar.jpg"
      )
    }

    const result = await hd(imageUrl, set)

    const url =
      result?.result ||
      result?.url ||
      result?.data?.url ||
      result?.data?.result

    if (!url) {
      return msg.reply("Gagal ambil hasil HD dari API.")
    }

    await sock.sendMessage(msg.from, {
      image: { url },
      caption: "Done, gambar udah di-HD-in."
    }, { quoted: msg.raw })
  }
}
