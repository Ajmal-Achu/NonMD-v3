let fetch = require ('node-fetch')
let handler = async (m, { conn }) => {
    let haruno = `┌ 「 𝐆𝐈𝐓」
    *Here Is The Git Bro🙂*
  https://github.com/Ajmal-Achu/Nandhutty-V3
  *Official Website*
  https://a-j-m-a-l.github.io
 *Watch Tutorial Video*
`.trim()
    await conn.send2ButtonImg(m.chat, await (await fetch("https://telegra.ph/file/584b99e814690766d9761.jpg")).buffer(), haruno, 'Nandhutty V3', 'poli❤️', 'kk', 'Tnks😄', 'kk', m)
}
handler.tags = ['main']
handler.help = ['git']
handler.command = /^(git)$/i
module.exports = handler
