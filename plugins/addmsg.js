
let { WAMessageProto } = require('@adiwajshing/baileys')

let handler = async(m, { conn, command, usedPrefix, text }) => {
    let M = WAMessageProto.WebMessageInfo
    let which = command.replace(/add/i, '')
    if (!m.quoted) throw `Reply message with command *${usedPrefix + command}*`
    if (!text) throw `Usage:${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command} test`
    let msgs = db.data.msgs
    if (text in msgs) throw `'${text}' has been registered!`
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    if (db.data.chats[m.chat].getmsg) return m.reply(`Successfully added message '${text}'
    
Access it by typing its name`.trim())
    else return await conn.sendButton(m.chat, `Successfully added message '${text}'
    
access with ${usedPrefix}get${which} ${text}`, '© sticker', 'Activate', '.on getmsg', m)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'stickers', 'gif'].map(v => 'add' + v + ' <text>' )
handler.tags = ['database']
handler.command = /^add(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler
