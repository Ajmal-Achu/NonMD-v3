let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  let id = m.chat
  if (id in conn.tebakgambar) return conn.reply(m.chat, 'Not yet answered!', conn.tebakgambar[id][0])
  let res = await fetch(API('amel', '/tebakgambar', {}, 'apikey'))
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.status) throw json
  let caption = `
${json.deskripsi}
Time *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}hint for help
`.trim()
  conn.tebakgambar[id] = [
    await conn.sendButtonImg(m.chat, json.img, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', '.hint', m),
    json, poin,
    setTimeout(() => {
      if (conn.tebakgambar[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Guess the picture', '.tebakgambar', conn.tebakgambar[id][0])
      delete conn.tebakgambar[id]
    }, timeout)
  ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar$/i

handler.game = true

module.exports = handler