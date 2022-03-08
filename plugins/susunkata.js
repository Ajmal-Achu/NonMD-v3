let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) return conn.reply(m.chat, 'Not answered yet!', conn.susunkata[id][0])
    let res = await fetch(API('amel', '/susunkata', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
${json.soal}

Type: ${json.tipe}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}suka for help
`.trim()
    conn.susunkata[id] = [
        await conn.sendButton(m.chat, caption, '© ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', '.suka', m),
        json, poin,
        setTimeout(() => {
            if (conn.susunkata[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, '© ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Arrange Words', '.susunkata', conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i

handler.game = true

module.exports = handler