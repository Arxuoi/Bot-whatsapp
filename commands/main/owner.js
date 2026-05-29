module.exports = {
  name: "owner",
  aliases: ["creator", "dev"],
  run: async ({ sock, msg }) => {

    const owner =
      process.env.OWNER.replace(/[^0-9]/g, "")

    await sock.sendMessage(
      msg.from,
      {
        contacts: {
          displayName: "Shen Owner",
          contacts: [
            {
              displayName: "Shen Owner",
              vcard:
`BEGIN:VCARD
VERSION:3.0
FN:Shen Owner
TEL;type=CELL;type=VOICE;waid=${owner}:${owner}
END:VCARD`
            }
          ]
        }
      },
      { quoted: msg.raw }
    )
  }
}
