module.exports = Object.assign(async function handler(m, { text, usedPrefix, command }) {
    db.data.sticker = db.data.sticker || {}
    if (!m.quoted) throw `Reply sticker with command *${usedPrefix + command}*`
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    if (!text) throw `Use :\n${usedPrefix + command} <text>\n\nExample :\n${usedPrefix + command} tes`
    let sticker = db.data.sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (sticker[hash] && sticker[hash].locked) throw 'You do not have permission to modify this sticker order'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`Success!`)
}, {
    help: ['cmd'].map(v => 'set' + v + ' <text>'),
    tags: ['database'],
    command: ['setcmd']
})