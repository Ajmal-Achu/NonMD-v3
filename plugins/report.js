let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `if you find an error message, report by using this command\n\nexample:\n${usedPrefix + command} Good afternoon Owner, I found an error like the following <copy / tag error message> `
    if (text.length < 10) throw `Reports are too short, at least 10 characters!`
    if (text.length > 1000) throw `Report is too long, a maximum of 1000 characters!`
    let teks = `*${command.toUpperCase()}!*\n\nFrom : *@${m.sender.split`@`[0]}*\n\nMessage : ${text}\n`
    conn.reply(global.owner[0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })
    m.reply(`_Message sent to bot owner, if${command.toLowerCase()} just playing games will not be responded._`)
}
handler.help = ['report', 'request'].map(v => v + ' <text>')
handler.tags = ['info']
handler.command = /^(report|request)$/i
module.exports = handler