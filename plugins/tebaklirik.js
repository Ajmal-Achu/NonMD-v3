let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (id in conn.tebaklirik) return conn.reply(m.chat, 'Not yet answered!', conn.tebaklirik[id][0])
    let res = await fetch(API('amel', '/tebaklirik', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} Seconds*
Type ${usedPrefix}teli for help
Bonus: ${poin} XP
`.trim()
    conn.tebaklirik[id] = [
        await conn.sendButton(m.chat, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', `.teli`, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklirik[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Guess the Lyrics', `.tebaklirik`, conn.tebaklirik[id][0])
            delete conn.tebaklirik[id]
        }, timeout)
    ]
}
handler.help = ['tebaklirik']
handler.tags = ['game']
handler.command = /^tebaklirik/i

handler.game = true

module.exports = handler