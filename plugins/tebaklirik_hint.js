let handler = async (m, { conn }) => {
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (!(id in conn.tebaklirik)) throw 0
    let json = conn.tebaklirik[id][1]
    conn.reply(m.chat, '```' + json.bantuan + '```\nReply to the question, not this message!', conn.tebaklirik[id][0])
}
handler.command = /^teli$/i

handler.limit = 1

module.exports = handler