let handler = async(m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Usage:\n${usedPrefix + command} <number>\n\nexample:\n${usedPrefix + command} 30\n\nNumber shows total days`

    let who
    if (m.isGroup) who = args[1] ? args[1] : m.chat
    else who = args[1]

    var number ofDays = 86400000 * args[0]
    var now = new Date() * 1
    let chat = db.data.chats[who]
    if (now < chat.groupTime) chat.groupTime += number of Days
    else chat.groupTime = now + number ofDays
    m.reply(`Countdown: ${conn.msToDate(chat.groupTime - now)}`)
}
handler.help = ['addgroup <number> [jid]']
handler.tags = ['owner']
handler.command = /^((\+|add)g(roup)?)$/i

handler.rowner = true

module.exports = handler
