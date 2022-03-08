let handler = async(m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = db.data.users[who]
    if (!who) return m.reply(`Tag/Mention!\n\nExample:\n${usedPrefix + command} @0 1\n\nThe number 1 represents the total days`)
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `Which number?\n\nExample:\n${usedPrefix + command} @0 1`
    if (isNaN(txt)) return m.reply(`Only numbers!\n\nExample:\n${usedPrefix + command} @0 1`)
    var number ofDays = 86400000 * txt
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += number ofDays
    else user.premiumTime = now + number ofDays
    user.premium = true
    m.reply(`Successfully added *${user.name}* as Premium user for ${txt} days.\n\nCountdown: ${conn.msToDate(user.premiumTime - now)}`)
}
handler.help = ['addprem [@user] <number>']
handler.tags = ['owner']
handler.command = /^(add|add|\+)p(rem)?$/i

handler.rowner = true

module.exports = handler
