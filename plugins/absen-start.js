let handler = async (m, { conn, usedPrefix, text }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) return await conn.sendButton(m.chat, `There are still absences in this chat!`, 'watermark', 'Delete', `${usedPrefix}-absence`, conn.absen[id][0])
    conn.absen[id] = [
        await conn.sendButton(m.chat, `Absence begins``, 'watermark', 'Absence', `${usedPrefix}absence`, m),
        [],
        text
    ]
}
handler.help = ['mulaiabsen [teks]']
handler.tags = ['absen']
handler.command = /^(\+|start|mulai)absen$/i

module.exports = handler
