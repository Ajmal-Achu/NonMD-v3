let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) return conn.reply(m.chat, 'Belum dijawab!', conn.tekateki[id][0])
    let res = await fetch(API('amel', '/tekateki', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} Seconds*
Type ${usedPrefix}tete for help
Bonus: ${poin} XP
`.trim()
    conn.tekateki[id] = [
        await conn.sendButton(m.chat, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', `.tete`, m),
        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Puzzle', `.puzzle`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['puzzle']
handler.tags = ['game']
handler.command = /^puzzle/i

handler.game = true

module.exports = handler