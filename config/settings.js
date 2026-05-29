module.exports = {
  bot: {
    name: process.env.BOT_NAME || "Shen",
    prefix: process.env.PREFIX || "!"
  },

  owner: {
    number: process.env.OWNER || ""
  },

  sticker: {
    packname: "Shen Bot",
    author: "Shen"
  },

  menu: {
    footer: "© Shen Bot"
  },

  api: {
    baseUrl: "https://api.naze.biz.id"
  }
}
