module.exports = {
  name: "ping",
  run: async ({ msg }) => {
    const start = Date.now()

    await msg.reply("Testing...")

    const end = Date.now()

    await msg.reply(`🏓 Pong\n${end - start} ms`)
  }
}
