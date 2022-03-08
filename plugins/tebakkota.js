let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkota = conn.tebakkota ? conn.tebakkota : {}
    let id = m.chat
    if (id in conn.tebakkota) return conn.reply(m.chat, 'Not yet answered!', conn.tebakkota[id][0])
    let res = await fetch(API('dhnjing', '/fun/tebakkota'))
    if (!res.status) throw eror
    let result = await res.json()
    if (result.status != 200) throw json
    let json = result.result
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}teko For help
`.trim()
    conn.tebakkota[id] = [
        await conn.sendButton(m.chat, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', '.teko', m),
        json, poin,
        setTimeout(async () => {
            if (conn.tebakkota[id]) await conn.sendButton(m.chat, `Time runs out! \ The answer is *${json.jawaban}*`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Guess the city', '.tebakkota', conn.tebakkota[id][0])
            delete conn.tebakkota[id]
        }, timeout)
    ]
}
handler.help = ['tebakkota']
handler.tags = ['game']
handler.command = /^tebakkota/i

handler.game = true

module.exports = handler