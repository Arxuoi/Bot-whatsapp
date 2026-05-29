const { runtime } = require("../../lib/utils")

module.exports = {
  name: "runtime",
  aliases: ["uptime"],
  run: async ({ msg }) => {
    const uptime = process.uptime()

    await msg.reply(
      `⏱ Runtime\n\n${runtime(uptime)}`
    )
  }
}
