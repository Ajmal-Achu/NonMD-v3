const fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) {
        conn.reply(m.chat, 'not answered!', conn.asahotak[id][0])
        throw false
    }
    let res = await fetch(API('amel', '/asahotak', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} seconds*
Type ${usedPrefix}ao for help
`.trim()
    conn.asahotak[id] = [
        await conn.sendButton(m.chat, caption, wm, 'Help', '.ao', m),
        json, poin,
        setTimeout(async () => {
            if (conn.asahotak[id]) await conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, wm, 'Asah Otak', '.asahotak', conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['use brain']
handler.tags = ['game']
handler.command = /^usebrain/i

handler.game = true

module.exports = handler
