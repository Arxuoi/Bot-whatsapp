require("dotenv").config()

const { connectBot, handleConnection } = require("./lib/connect")
const handler = require("./lib/handler")

async function startBot() {
  const sock = await connectBot()

  handleConnection(sock, startBot)

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]

    if (!msg?.message) return
    if (msg.key.fromMe) return

    await handler(sock, msg)
  })
}

startBot()
