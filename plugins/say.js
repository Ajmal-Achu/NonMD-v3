let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `uhm. where is the text?\n\nExample:\n${usedPrefix + command} Hello`
    conn.reply(m.chat, text, null)
}
handler.help = ['say <text>']
handler.tags = ['tools']
handler.command = /^(say)$/i

module.exports = handler