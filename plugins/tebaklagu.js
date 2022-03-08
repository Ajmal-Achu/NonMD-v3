let fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (id in conn.tebaklagu) return conn.reply(m.chat, 'Belum dijawab!', conn.tebaklagu[id][0])
    /**
     * silahkan tambahkan sendiri playlistnya
     * ['id', 'id', 'dan seterusnya']
     */
    let playlist = ['3AaKHE9ZMMEdyRadsg8rcy']
    let res = await fetch(API('amel', '/tebaklagu', { id: conn.pickRandom(playlist) }, 'apikey'))
    if (!res.ok) throw res.status
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
    Reply to the audio you want to answer
Timeout *${(timeout / 1000).toFixed(2)} Seconds*
Type *${usedPrefix}cek* for help
Bonus: ${poin} XP`.trim()
    conn.tebaklagu[id] = [
        await conn.sendButton(m.chat, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Help', `.cek`, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaklagu[id]) conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.judul}*`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Guess the Song', `.tebaklagu`, conn.tebaklagu[id][0])
            delete conn.tebaklagu[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.preview, 'eror.mp3', '', m, 1, { mimetype: 'audio/mp4' })
}
handler.help = ['tebaklagu']
handler.tags = ['game']
handler.command = /^tebaklagu$/i

handler.game = true

module.exports = handler