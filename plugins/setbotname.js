// NurNurz
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Use :\n${usedPrefix + command} <text>\n\nExample :\n${usedPrefix + command} ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3`
  try {
    await conn.updateProfileName(text)
    m.reply('Succeed!')
  } catch (e) {
    console.log(e)
    throw `Error`
  }
}
handler.help = ['setbotname <text>']
handler.tags = ['owner']
handler.command = /^(setbotname)$/i

handler.owner = true

module.exports = handler