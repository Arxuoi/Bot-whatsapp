const fs = require("fs")

function menuText() {
  return `
╭───〔 ${process.env.BOT_NAME || "SHEN"} BOT 〕
│ Prefix : ${process.env.PREFIX}
│ Mode   : Private Bot
╰────────────

╭─ Main
│ ${process.env.PREFIX}menu
│ ${process.env.PREFIX}ping
│ ${process.env.PREFIX}runtime
╰────────────

╭─ Tools
│ ${process.env.PREFIX}sticker
│ ${process.env.PREFIX}brat <teks>
│ ${process.env.PREFIX}hd
╰────────────

╭─ AI
│ ${process.env.PREFIX}ai <pesan>
╰────────────
`
}

async function sendMenu(sock, msg) {
  const bannerPath = "./assets/banner.jpg"

  if (fs.existsSync(bannerPath)) {
    return sock.sendMessage(msg.from, {
      image: fs.readFileSync(bannerPath),
      caption: menuText()
    }, { quoted: msg.raw })
  }

  return sock.sendMessage(msg.from, {
    text: menuText()
  }, { quoted: msg.raw })
}

module.exports = { menuText, sendMenu }
