let handler = async (m, { conn }) => {
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (!(id in conn.tebaklagu)) throw false
    let json = conn.tebaklagu[id][1]
    conn.reply(m.chat, '```' + json.bantuan + '```\nReply to the question, not this message or the audio!', conn.tebaklagu[id][0])
}
handler.command = /^cek$/i

handler.limit = 1

module.exports = handler