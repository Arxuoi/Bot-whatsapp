const makeWASocket = require("@whiskeysockets/baileys").default
const { useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const { Boom } = require("@hapi/boom")
const pino = require("pino")
const chalk = require("chalk")

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    browser: [process.env.BOT_NAME || "Shen", "Chrome", "1.0.0"]
  })

  if (!sock.authState.creds.registered) {
    const phone = (process.env.OWNER || "").replace(/\D/g, "")
    const code = await sock.requestPairingCode(phone)
    console.log(chalk.green(`\nPAIRING CODE: ${code}\n`))
  }

  sock.ev.on("creds.update", saveCreds)

  return sock
}

function handleConnection(sock, startBot) {
  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log(chalk.cyan(`${process.env.BOT_NAME || "Shen"} Connected`))
    }

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error).output.statusCode

      if (reason !== DisconnectReason.loggedOut) {
        console.log(chalk.yellow("Reconnect..."))
        startBot()
      } else {
        console.log(chalk.red("Session logged out. Hapus folder session buat login ulang."))
      }
    }
  })
}

module.exports = { connectBot, handleConnection }
