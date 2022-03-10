const free = 500
const plum = 5000

let handler = async(m, { conn, usedPrefix, isPrems }) => {
  if (db.data.users[m.sender].level < 1) return await conn.sendButton(m.chat, 'You are still level 0', '© ᴀᴊᴍᴀʟ-ᴀᴄʜᴜ', 'Level up', `${usedPrefix }levelup`, m)
  let time = db.data.users[m.sender].lastclaim + 86400000
  if (new Date - db.data.users[m.sender].lastclaim < 86400000) throw `You already claimed daily claim today\nWait for ${conn.msToTime(time - new Date())} again`
  db.data.users[m.sender].exp += isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level
  m.reply(`+${isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level} XP\n\nThe higher the level, the higher also XP gained`)
  db.data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['daily', 'claim']
handler.tags = ['xp']
handler.command = /^(daily|claim)$/i

module.exports = handler
