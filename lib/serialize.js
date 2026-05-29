function getBody(message) {
  return (
    message?.conversation ||
    message?.extendedTextMessage?.text ||
    message?.imageMessage?.caption ||
    message?.videoMessage?.caption ||
    ""
  )
}

function serialize(sock, msg) {
  const message = msg.message || {}
  const quoted =
    message?.extendedTextMessage?.contextInfo?.quotedMessage || null

  return {
    id: msg.key.id,
    from: msg.key.remoteJid,
    sender: msg.key.participant || msg.key.remoteJid,
    isGroup: msg.key.remoteJid.endsWith("@g.us"),
    fromMe: msg.key.fromMe,
    body: getBody(message),
    message,
    quoted,
    raw: msg,

    reply: async (text) => {
      return sock.sendMessage(
        msg.key.remoteJid,
        { text },
        { quoted: msg }
      )
    }
  }
}

module.exports = serialize
