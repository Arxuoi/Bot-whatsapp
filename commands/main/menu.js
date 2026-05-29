const { sendMenu } = require("../../lib/menu")

module.exports = {
  name: "menu",
  aliases: ["help"],
  run: async ({ sock, msg }) => {
    await sendMenu(sock, msg)
  }
}
