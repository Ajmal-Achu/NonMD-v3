const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*teko/i.test(m.quoted.contentText)) return !0
    this.tebakkota = this.tebakkota ? this.tebakkota : {}
    if (!(id in this.tebakkota)) return m.reply('Guess City has ended')
    if (m.quoted.id == this.tebakkota[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkota[id][1]))
        if (['.teko', 'Help', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkota[id][2]
            await this.sendButton(m.chat, benar + ` +${this.tebakkota[id][2]} XP`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Guess the City', '.tebakkota', m)
            clearTimeout(this.tebakkota[id][3])
            delete this.tebakkota[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(dikit)
        else m.reply(salah)
    }
    return !0
}

module.exports = handler
