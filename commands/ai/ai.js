const { ai } = require("../../lib/api")

module.exports = {
  name: "ai",
  aliases: ["ask", "gpt", "shen"],
  run: async ({ msg, args }) => {
    const text = args.join(" ")

    if (!text) {
      return msg.reply("Pertanyaannya mana 😤\nContoh: !ai jelasin black hole")
    }

    try {
      const result = await ai(text)

      const answer =
        result?.result ||
        result?.message ||
        result?.data?.result ||
        result?.data?.message ||
        result?.data ||
        result

      if (!answer) {
        return msg.reply("AI-nya nggak ngasih jawaban.")
      }

      await msg.reply(String(answer))

    } catch (err) {
      console.error(err)
      await msg.reply("AI error, mungkin API-nya lagi ngambek.")
    }
  }
}
