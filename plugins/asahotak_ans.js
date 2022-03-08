const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*ao/i.test(m.quoted.contentText)) return !0
    this.usebrain = this.usebrain ? this.usebrain : {}
    if (!(id in this.asahotak)) return m.reply('Brain Teaser has ended')
    if (m.quoted.id == this.asahotak[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.asahotak[id][1]))
        if (['.ao', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.asahotak[id][2]
            await this.sendButton(m.chat, benar + ` +${this.usebrain[id][2]} XP`, wm, 'Brain teaser', '.usebrain', m)
            clearTimeout(this.usebrain[id][3])
            delete this.usebrain[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(dikit)
        else m.reply(wrong)
    }
    return !0
}

module.exports = handler
