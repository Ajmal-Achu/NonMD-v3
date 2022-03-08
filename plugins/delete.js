let handler = function(m) {
  if (!m.quoted) throw false
  let { chat, fromMe, id, isBaileys } = m.quoted
  if (!fromMe) throw false
  if (/Stickerin Broadcast/i.test(m.quoted.text)) throw 'Could not delete broadcast message!'
  if (!isBaileys) throw 'The message was not sent by a bot!'
  this.deleteMessage(chat, {
    fromMe,
    en,
    remoteJid: chat
  })
}
handler.help = ['del', 'delete']
handler.tags = ['info']
handler.command = /^del(ete)?$/i

module.exports = handler
