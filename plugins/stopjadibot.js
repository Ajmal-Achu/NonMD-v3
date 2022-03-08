let handler = async (m, { conn }) => {
  if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, 'Why not go directly to the terminal?', m)
  else {
    await m.reply('Successfully stopped the bot')
    conn.close()
  }
}
handler.help = ['berhenti', 'stop']
handler.tags = ['jadibot']
handler.command = /^(berhenti|stop)$/i

handler.owner = true

module.exports = handler