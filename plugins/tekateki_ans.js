const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*tete/i.test(m.quoted.contentText)) return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return m.reply('The puzzle is over')
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        if (['.tete', 'Help', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            db.data.users[m.sender].exp += this.tekateki[id][2]
            await this.sendButton(m.chat, benar + ` +${this.tekateki[id][2]} XP`, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Puzzles', '.puzzle', m)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(dikit)
        else m.reply(salah)
    }
    return !0
}

module.exports = handler