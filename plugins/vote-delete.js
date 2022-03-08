let handler = async (m, { conn, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return conn.sendButton(m.chat, `No voting in this group!`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Start', `${usedPrefix}+vote`, m)
    delete conn.vote[id]
    m.reply(`Succeed!`)
}
handler.help = ['hapusvote']
handler.tags = ['vote']
handler.command = /^(delete|hapus|-)vote$/i

module.exports = handler