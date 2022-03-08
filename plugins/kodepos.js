let fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Use:\n${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command} Lamongan`
    let res = await fetch(API('xteam', '/kodepos', { q: text }, 'APIKEY'))
    if (!res.ok) throw `${res.status} ${res.statusText}`
    let json = await res.json()
    if (!json.status) throw json
    let mes = json.result.map((v, i) => `${i + 1}. Province: ${v.province}\nCity: ${v.city}\nDistricts: ${v.subdistrict}\nUrban: ${v.urban}\nPostal code: ${v.postalcode}`).join('\n\n')
    m.reply(mes)
}
handler.help = ['postalcode <city>']
handler.tags = ['tools']
handler.command = /^postalcode$/i

handler.limit = 0

module.exports = handler
