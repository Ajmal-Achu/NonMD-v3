// NurNurz
let handler = async (m, { conn, text }) => {
  if (!text) throw `Use:\n${usedPrefix + command} <text>\n\nExample :\n${usedPrefix + command} tes`
  try {
    await conn.setStatus(text)
    m.reply('Berhasil!')
  } catch (e) {
    console.log(e)
    throw `Eror`
  }
}
handler.help = ['setbotbio <text>']
handler.tags = ['owner']
handler.command = /^(setbotbio)$/i

handler.owner = true

module.exports = handler