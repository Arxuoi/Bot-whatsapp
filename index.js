require("dotenv").config()

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState
} = require("@whiskeysockets/baileys")

const {
    Boom
} = require("@hapi/boom")

const pino = require("pino")
const chalk = require("chalk")

async function startBot() {

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("./session")

    const sock = makeWASocket({
        logger: pino({
            level: "silent"
        }),
        auth: state,
        browser: [
            process.env.BOT_NAME,
            "Chrome",
            "1.0.0"
        ]
    })

    if (!sock.authState.creds.registered) {

        const phone = process.env.OWNER.replace(/\D/g, "")

        const code = await sock.requestPairingCode(phone)

        console.log(
            chalk.green(
                "\nPAIRING CODE : " + code
            )
        )
    }

    sock.ev.on("connection.update", async (update) => {

        const {
            connection,
            lastDisconnect
        } = update

        if (connection === "open") {

            console.log(
                chalk.cyan(
                    `\n${process.env.BOT_NAME} Connected`
                )
            )
        }

        if (connection === "close") {

            const reason =
                new Boom(
                    lastDisconnect?.error
                ).output.statusCode

            if (
                reason !== DisconnectReason.loggedOut
            ) {
                startBot()
            } else {
                console.log(
                    chalk.red(
                        "Session Logged Out"
                    )
                )
            }
        }
    })

    sock.ev.on(
        "creds.update",
        saveCreds
    )

    sock.ev.on(
        "messages.upsert",
        async (chatUpdate) => {

            const msg =
                chatUpdate.messages[0]

            if (!msg.message) return

            const body =
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                ""

            if (
                !body.startsWith(
                    process.env.PREFIX
                )
            ) return

            const args =
                body
                .slice(
                    process.env.PREFIX.length
                )
                .trim()
                .split(/ +/)

            const command =
                args
                .shift()
                .toLowerCase()

            console.log(
                `[CMD] ${command}`
            )

            switch (command) {

                case "ping":

                    await sock.sendMessage(
                        msg.key.remoteJid,
                        {
                            text: "Pong 🏓"
                        }
                    )

                break

                case "menu":

                    await sock.sendMessage(
                        msg.key.remoteJid,
                        {
                            text:
`╭─〔 SHEN BOT 〕
│ Prefix : ${process.env.PREFIX}
│ Status : Online
╰────────────

!menu
!ping
!ai
!brat
!hd
!sticker`
                        }
                    )

                break

            }
        }
    )
}

startBot()
