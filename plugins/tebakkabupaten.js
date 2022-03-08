let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkabupaten = conn.tebakkabupaten ? conn.tebakkabupaten : {}
    let id = m.chat
    if (id in conn.tebakkabupaten) return conn.reply(m.chat, 'Not yet answered!', conn.tebakkabupaten[id][0])
    let res = await fetch(API('amel', '/tebakkabupaten', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}tekb for help
Bonus: ${poin} XP
`.trim()
    conn.tebakkabupaten[id] = [
        await conn.sendButtonImg(m.chat, json.url, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', '.teka', m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkabupaten[id]) conn.sendButton(m.chat, `Time has run out!\nThe answer is *${json.title}*`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Guess the District', '.tebakkabupaten', conn.tebakkabupaten[id][0])
            delete conn.tebakkabupaten[id]
        }, timeout)
    ]
}
handler.help = ['tebakkabupaten']
handler.tags = ['game']
handler.command = /^tebakkabupaten/i

handler.game = true

module.exports = handler