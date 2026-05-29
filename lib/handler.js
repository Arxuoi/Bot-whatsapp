
const fs = require("fs")
const path = require("path")
const serialize = require("./serialize")

const commands = new Map()

function loadCommands() {
  const baseDir = path.join(__dirname, "../commands")

  if (!fs.existsSync(baseDir)) return

  const folders = fs.readdirSync(baseDir)

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder)
    if (!fs.statSync(folderPath).isDirectory()) continue

    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"))

    for (const file of files) {
      const command = require(path.join(folderPath, file))
      if (!command.name || !command.run) continue

      commands.set(command.name, command)

      if (command.aliases) {
        for (const alias of command.aliases) {
          commands.set(alias, command)
        }
      }
    }
  }
}

async function handler(sock, rawMsg) {
  const msg = serialize(sock, rawMsg)

  if (!msg.body) return
  if (!msg.body.startsWith(process.env.PREFIX)) return

  const args = msg.body.slice(process.env.PREFIX.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = commands.get(commandName)
  if (!command) return

  try {
    await command.run({ sock, msg, args })
  } catch (err) {
    console.error(err)
    await sock.sendMessage(msg.from, {
      text: "Error jir, command-nya ngambek 😭"
    }, { quoted: rawMsg })
  }
}

loadCommands()

module.exports = handler
