const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Reply image with command *${usedPrefix + command}*`
  let media = await q.download()
  let url = await uploadImage(media)
  await conn.sendFile(m.chat, API('xteam', '/videomaker/' + command, { url }, 'APIKEY'), 'shaunthesheep.mp4', 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', m)
}
handler.help = ['shaunthesheep', 'poly', 'glowing', 'colorful', 'army', 'retro']
handler.tags = ['videomaker']
handler.command = /^shaunthesheep|poly|bold|glowing|colorful|army|retro$/i

module.exports = handler