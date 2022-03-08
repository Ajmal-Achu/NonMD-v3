async function handler(m) {
    if (!m.quoted) throw `Reply to messages with commands *${usedPrefix + command}*`
    let q = this.serializeM(await m.getQuotedObj())
    if (!q.quoted) throw 'The message you replied to did not contain a reply!'
    await q.quoted.copyNForward(m.chat, true)
}
handler.help = ['q']
handler.tags = ['tools']
handler.command = /^q$/i

module.exports = handler
