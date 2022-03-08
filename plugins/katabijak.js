const { quotes } = require('../lib/scrape')
let handler = async (m, { command, args, usedPrefix }) => {
    let er = `Use:
${usedPrefix + command} <text>

Example:
${usedPrefix + command} love

┌「 *Options* 」
├ love
├ miss
├ dream
├ alone
├ bepatient
├ sadness
├ wedding
├ independence
└────`.trim()
    if (!args[0]) throw er
    switch (args[0].toLowerCase()) {
        case 'love':
        case 'miss':
        case 'dream':
        case 'alone':
        case 'patient':
        case 'sadness':
        case 'wedding':
        case 'independence':
            quotes(args[0].toLowerCase()).then(async res => {
                let data = JSON.stringify(res)
                let json = JSON.parse(data)
                let random = Math.floor(Math.random() * json.data.length)
                let hasil = json.data[random]
                let { author, bio, quote } = hasil
                await conn.send2Button(m.chat, `“${quote}”`, `${author} - ${bio}`, `WORDS OF WISDOM ${args[0].toUpperCase()}`, `${usedPrefix + command} ${args[0]}`, `Random`, `${usedPrefix + command} ${conn.pickRandom(['miss', 'dream', 'alone', 'patient', 'sadness', 'marriage', 'independence'])}`, m)
            })
            break
        default:
            throw er
    }
}
handler.help = ['katabijak'].map(v => v + ' <opsi>')
handler.tags = ['internet']
handler.command = /^(katabijak|jagokata)$/i

module.exports = handler 
