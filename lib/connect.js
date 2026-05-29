const makeWASocket = require("@whiskeysockets/baileys").default
const { useMultiFileAuthState, DisconnectReason, Browsers } = require("@whiskeysockets/baileys")
const { Boom } = require("@hapi/boom")
const pino = require("pino")
const chalk = require("chalk")

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    browser: Browsers.macOS("Chrome"),
    connectTimeoutMs: 60000
  })

  sock.ev.on("creds.update", saveCreds)

  if (!sock.authState.creds.registered) {
    await sleep(3000)

    const phone = (process.env.OWNER || "").replace(/\D/g, "")

    try {
      const code = await sock.requestPairingCode(phone)
      console.log(chalk.green(`\nPAIRING CODE: ${code}\n`))
    } catch (e) {
      console.log(chalk.red("Gagal ambil pairing code. Coba jalankan ulang: node index.js"))
      console.log(e.message)
    }
  }

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
        startBot()
      } else {
        console.log(chalk.red("Session logged out. Hapus folder session buat login ulang."))
      }
    }
  })
}

module.exports = { connectBot, handleConnection }
