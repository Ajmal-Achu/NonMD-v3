let handler = async(m, { conn, usedPrefix }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = m.chat
    conn.absent = conn.absent ? conn.absent : {}
    if (!(id in conn.absen)) return await conn.sendButton(m.chat, `No absence in progress!`, '© stickerin', 'Start', `${usedPrefix}+absent`, m)
    delete conn.absen[id]
    m.reply(`successfully delete absent session!`)
}
handler.help = ['remove absent']
handler.tags = ['absent']
handler.command = /^(-|delete|delete)absent$/i

module.exports = handler
