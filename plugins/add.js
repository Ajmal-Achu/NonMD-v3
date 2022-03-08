let fetch = require('node-fetch')
let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) throw `*ᴡʜɪᴄʜ ɴᴜᴍʙᴇʀ?* \n *ᴇxᴀᴍᴘʟᴇ:* \n\n${usedPrefix + command + ' ' + global.owner[0]}`
  let _participants = participants.map(user => user.jid)
  let users = (await Promise.all(
    text.split(',')
      .map(v => v.replace(/[^0-9]/g, ''))
      .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
      .map(async v => [
        v,
        await conn.isOnWhatsApp(v + '@s.whatsapp.net')
      ])
  )).filter(v => v[1]).map(v => v[0] + '@c.us')
  let response = await conn.groupAdd(m.chat, users)
  if (response[users] == 408) throw `_Failed!_\n\nThe number has been dialed recently\nCan only enter via *${usedPrefix}link* grup`
  let pp = await conn.getProfilePicture(m.chat).catch(_ => false)
  let jpegThumbnail = pp ? await (await fetch(pp)).buffer() : false
  for (let user of response.participants.filter(user => Object.values(user)[0].code == 403)) {
    let [[jid, {
      invite_code,
      invite_code_exp
    }]] = Object.entries(user)
    let teks = `*ɪɴᴠɪᴛɪɴɢ* @${jid.split`@`[0]} *ᴜꜱɪɴɢ ɪɴᴠɪᴛᴀᴛɪᴏɴ...*`
    m.reply(teks, null, {
      contextInfo: {
        mentionedJid: conn.parseMention(teks)
      }
    })
    await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, false, 'ɪɴᴠɪᴛᴀᴛɪᴏɴ ᴛᴏ ᴊᴏɪɴ ᴍʏ ᴡʜᴀᴛꜱᴀᴘᴘ ɢʀᴏᴜᴘ', jpegThumbnail ? {
      jpegThumbnail
    } : {})
  }
}
handler.help = ['add', '+'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^add/i

handler.admin = true
handler.group = true
handler.botAdmin = true

module.exports = handler
