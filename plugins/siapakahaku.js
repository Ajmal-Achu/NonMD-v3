let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) return conn.reply(m.chat, 'Velum answered!', conn.siapakahaku[id][0])
    let res = await fetch(API('amel', '/siapakahaku', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} second*
Type ${usedPrefix}who for help
`.trim()
    conn.siapakahaku[id] = [
        await conn.sendButton(m.chat, caption, '© ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', '.who', m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is*${json.jawaban}*`, '© ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Who am I', '.siapaaku', conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku/i

handler.game = true

module.exports = handler