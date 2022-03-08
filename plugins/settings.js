let fetch = require ('node-fetch')
let handler = async (m, { conn }) => {
    let haruno = `┌ 「 𝐎𝐏𝐄𝐍 / 𝐂𝐋𝐎𝐒𝐄」
    ᴄʟɪᴄᴋ ᴏɴ ᴛʜᴇ ʙᴇʟᴏᴡ ʙᴜᴛᴛᴏɴs ᴛᴏ ᴏᴘᴇɴ ᴏʀ ᴄʟᴏsᴇ ᴛʜᴇ ɢʀᴏᴜᴘ🙂
`.trim()
    await conn.send2ButtonLoc(m.chat, await (await fetch("https://telegra.ph/file/aeffa4c9d7b9f8f3a265b.jpg")).buffer(), haruno, '© ᴀᴊᴍᴀʟ-ᴀᴄʜᴜ', 'ᴏᴘᴇɴ', '.grup open', 'ᴄʟᴏsᴇ', '.grup close', m)
}
handler.tags = ['grup']
handler.help = ['open/close']
handler.command = /^(settings)$/i
module.exports = handler
