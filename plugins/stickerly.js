const fetch = require('node-fetch')
const { sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use :\n${usedPrefix + command} <text>\n\nExample :\n${usedPrefix + command} spongebob`
    let res = await fetch(API('zeks', '/api/searchsticker', { q: text }, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let hasil = json.sticker.map((v, i) => `${i + 1}. ${v}`).join('\n')
    m.reply(`*${json.title}*
*Estimated complete:* ${json.sticker.length * 1.5} second
`.trim())

    for (let i of json.sticker) {
        stiker = await sticker5(false, i, packname, author)
        await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
        await conn.delay(1500)
    }
    m.reply('_*Finished*_')

}
handler.help = ['stickerly <text>']
handler.tags = ['sticker']
handler.command = /^(stic?kerly)$/i

handler.limit = 1

module.exports = handler 