let pajak = 0.02
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let fail = `this command to give XP to other users\n\nexample:\n${usedPrefix + command} @6285157336614 10\nor reply to the message by the command: ${usedPrefix + command} 10`
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  else who = m.chat
  if (!who) {
    conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['6285157336614@s.whatsapp.net'] } })
    throw false
  }
  if (typeof global.db.data.users[who] == "undefined") {
    global.db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      registered: false,
      name: conn.getName(m.sender),
      age: -1,
      regTime: -1,
      afk: -1,
      afkReason: '',
      banned: false,
      level: 0,
      call: 0,
      role: 'Warrior V',
      autolevelup: false,
      pc: 0,
    }
  }
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) {
    conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['6285157336614@s.whatsapp.net'] } })
    throw false
  }
  if (isNaN(txt)) throw 'Only figures'
  let xp = parseInt(txt)
  let exp = xp
  let pjk = Math.ceil(xp * pajak)
  exp += pjk
  if (exp < 1) throw 'minimum 1'
  let users = global.db.data.users
  if (exp > users[m.sender].exp) throw 'Exp is insufficient to transfer, there is a tax also'
  users[m.sender].exp -= exp
  users[who].exp += xp

  m.reply(`(${-xp} XP) + (${-pjk} XP (Pajak 2%)) = ( ${-exp} XP)`)
  conn.fakeReply(m.chat, `+${xp} XP`, who, m.text)
}
handler.help = ['pay @user <total>']
handler.tags = ['xp']
handler.command = /^pay$/

module.exports = handler
