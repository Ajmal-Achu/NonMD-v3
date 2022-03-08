const fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`Example:\n${usedPrefix + command} jakarta`)
    let res = await fetch(global.API('zeks', '/api/jadwalsholat', { daerah: text }, 'apikey'))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let json = await res.json()
    if (!json.status) {
        if (json.message == 'use of apikey reached the limit') throw json
        let hasil = json.listdaerah.map((v, i) => `│ ${i + 1}. ${v}`).join`\n`
        m.reply(`
*${json.message}*

Example:
${usedPrefix + command} jakarta

┌ *Region List*
│ 
${hasil}
│ 
└────`.trim())
        throw false
    }
    m.reply(`Prayer Schedule ${text}\n\n${json.data.string}`.trim())

}
handler.help = ['salat <area>']
handler.tags = ['quran']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

module.exports = handler