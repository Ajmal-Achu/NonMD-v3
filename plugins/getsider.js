let handler = async(m, { conn, command, usedPrefix }) => {
  if (!m.quoted) throw `Reply to bot messages with the command *${usedPrefix + command}*`
  if (!m.quoted.fromMe) throw false
  if (!m.quoted.id) throw false
  let members = m.quoted.chat.endsWith('g.us') ? (await conn.groupMetadata(m.quoted.chat)).participants.length - 1 : m.quoted.chat.endsWith('@broadcast') ? -1 : 1
  let { reads, deliveries } = await conn.messageInfo(m.quoted.chat, m.quoted.id)
  let txt = `
*Read by:*
${reads.sort((a, b) => bt - at).map(({ jid, t }) => `@${jid.split`@`[0]}\n_${formatDate(t * 1000)}_`).join('\n')}
${members > 1 ? `${members - reads.length} remaining` : ''}

*Sent to:*
${deliveries.sort((a, b) => bt - at).map((({ jid, t }) => `wa.me/${jid.split`@`[0]}\n_${ formatDate(t * 1000)}_`).join('\n')}
${members > 1 ? `${members - reads.length - deliveries.length} remaining` : ''}
`.trim()
  m.reply(txt, null, {
    contextInfo: {
      mentionedJid: conn.parseMention(txt)
    }
  })
}
handler.help = ['getsider']
handler.tags = ['group']
handler.command = /^getsider$/

module.exports = handler

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}
