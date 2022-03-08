let handler = async (m, { conn, participants, command, text }) => {
    let who
    if (!m.isGroup) who = m.sender
    else {
        let member = participants.map(u => u.jid)
        who = member[Math.floor(Math.random() * member.length)]
    }
    let jawab = `
*Question:* ${command} ${text}?
*Answer:* @${who.replace(/@.+/, '')}
    `.trim()
    conn.reply(m.chat, jawab, m)
}
handler.help = ['', 'kah'].map(v => 'siapa' + v + ' <text>?')
handler.tags = ['shell']
handler.customPrefix = /(\?$)/
handler.command = /^siapa(kah)?$/i

module.exports = handler