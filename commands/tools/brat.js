const { brat } = require("../../lib/api")

module.exports = {
  name: "brat",
  aliases: ["bratt"],
  run: async ({ sock, msg, args }) => {
    const text = args.join(" ")

    if (!text) return msg.reply("Teksnya mana 😤\nContoh: !brat halo dunia")

    const buffer = await brat(text)

    await sock.sendMessage(msg.from, {
      image: buffer,
      caption: `Brat: ${text}`
    }, { quoted: msg.raw })
  }
}
