let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
    let id = m.chat
    if (id in conn.tebakkimia) return conn.reply(m.chat, 'Not yet answered!', conn.tebakkimia[id][0])
    let res = await fetch(API('amel', '/tebakkimia', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
    Element name of the symbol ${json.lambang} is...

Timeout *${(timeout / 1000).toFixed(2)} Seconds*
Type ${usedPrefix}teki For help
Bonus: ${poin} XP
`.trim()
    conn.tebakkimia[id] = [
        await conn.sendButton(m.chat, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', '.teki', m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkimia[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.unsur}*`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Guess Chemistry', '.tebakkimia', conn.tebakkimia[id][0])
            delete conn.tebakkimia[id]
        }, timeout)
    ]
}
handler.help = ['tebakkimia']
handler.tags = ['game']
handler.command = /^tebakkimia/i

handler.game = true

module.exports = handler