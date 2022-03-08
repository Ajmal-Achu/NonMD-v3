let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `reply to messages that can only be seen once`
    try {
        await conn.copyNForward(m.chat, await conn.loadMessage(m.chat, m.quoted.id), false, { readViewOnce: true })
    } catch (e) {
        throw `Reply to messages that can only be viewed once with a command *${usedPrefix + command}*`
    }
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^(read)?viewonce/i

module.exports = handler