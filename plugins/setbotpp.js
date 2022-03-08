let handler = async (m, { conn, usedPrefix, command }) => {
    let bot = conn.user.jid // Bot
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) throw `Reply sticker with command *${usedPrefix + command}*`
        conn.updateProfilePicture(bot, img)
        m.reply('Succeed!')
    }
}
handler.help = ['setbotpp']
handler.command = /^(setbotpp)$/i

handler.owner = true

module.exports = handler
