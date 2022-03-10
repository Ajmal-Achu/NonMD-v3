let fetch = require('node-fetch')
let winScore = 500

async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.sendButton(m.chat, 'There are still unanswered quizzes!', wm, 'Give up', 'give up', this.game[id].msg)
        throw false
    }
    let res = await fetch(API('amel', '/family100', { }, 'apikey'))
    if (!res.ok) throw error
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
*question:* ${json.question}

there are *${json.answers.length}* answers${json.answers.find(v => v.includes(' ')) ? `
(some answers have spaces)

+500 XP each correct answer
`: ''}
    `.trim()
    this.game[id] = {
        en,
        msg: await this.sendButton(m.chat, caption, wm, 'nyerah', 'nyerah', m),
        ...json,
        answered: Array.from(json.answer, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^f(amily)?100$/i

handler.game = true

module.exports = handler
