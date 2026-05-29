const axios = require("axios")

const BASE = "https://api.naze.biz.id"

function apiKey() {
  return process.env.NAZE_APIKEY
}

async function brat(text) {
  const url = `${BASE}/create/brat`

  const res = await axios.get(url, {
    params: {
      text,
      apikey: apiKey()
    },
    responseType: "arraybuffer"
  })

  return Buffer.from(res.data)
}

async function hd(imageUrl, set = "2") {
  const url = `${BASE}/tools/hd`

  const res = await axios.get(url, {
    params: {
      set,
      url: imageUrl,
      apikey: apiKey()
    }
  })

  return res.data
}

async function ai(messages) {
  const url = `${BASE}/ai/message`

  const res = await axios.get(url, {
    params: {
      messages,
      apikey: apiKey()
    }
  })

  return res.data
}

module.exports = {
  brat,
  hd,
  ai
}
