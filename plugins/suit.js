/* 
    Made by https://github.com/syahrularranger 
    Jangan di hapus credit nya :)
*/
let timeout = 60000
let poin = 500
let poin_lose = -100
let handler = async (m, { conn, usedPrefix }) => {
  conn.suit = conn.suit ? conn.suit : {}
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw 'Complete your previous suit'
  if (!m.mentionedJid[0]) return m.reply(`_Who do you want to challenge?_\nTag the person.. Example\n\n${usedPrefix}suit @${owner[1]}`, m.chat, { contextInfo: { mentionedJid: [owner[1] + '@s.whatsapp.net'] } })
  if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `The person you are challenging is playing suit with someone else :(`
  let id = 'suit_' + new Date() * 1
  let caption = `
_*SUIT PvP*_

@${m.sender.split`@`[0]} challenging @${m.mentionedJid[0].split`@`[0]} to play suit

Silahkan @${m.mentionedJid[0].split`@`[0]} 
`.trim()
  let footer = `Type "accept/ok/gas" to start suit\nType "reject/cannot/later" to decline`
  conn.suit[id] = {
    chat: await conn.send2Button(m.chat, caption, footer, 'Accept', 'ok', 'Reject', 'tolak', m, { contextInfo: { mentionedJid: conn.parseMention(caption) } }),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `_Suit time out_`, m)
      delete conn.suit[id]
    }, timeout), poin, poin_lose, timeout
  }
}
handler.tags = ['game']
handler.help = ['suitpvp', 'suit'].map(v => v + ' @tag')
handler.command = /^suit(pvp)?$/i

handler.group = true
handler.game = true

module.exports = handler
