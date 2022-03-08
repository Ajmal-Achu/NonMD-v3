let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `
Use:
${usedPrefix + command} <number>

Example :
${usedPrefix + command} 100

meaning you bet 100 XP.

*JACKPOT:* your bet is doubled
*Less fortunate:* +1 XP
*Lost:* your bet is taken`.trim()
    if (!args[0] || isNaN(args[0])) throw fa
    let taruhan = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 10000
    if (new Date - users.lastslot < 10000) throw `Wait for${conn.msToTime(time - new Date())}`
    if (taruhan < 1) throw 'Minimal 1 XP!'
    if (users.exp < taruhan) {
        throw `Your XP is not enough!`
    }

    let emojis = ["🏆️", "🥇", "💵"]
    let a = Math.floor(Math.random() * emojis.length)
    let b = Math.floor(Math.random() * emojis.length)
    let c = Math.floor(Math.random() * emojis.length)
    let x = [],
        y = [],
        z = []
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a]
        a++
        if (a == emojis.length) a = 0
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b]
        b++
        if (b == emojis.length) b = 0
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c]
        c++
        if (c == emojis.length) c = 0
    }
    let end
    if (a == b && b == c) {
        end = `JACKPOT! 🥳 *+${taruhan + taruhan} XP*`
        users.exp += taruhan
    } else if (a == b || a == c || b == c) {
        end = `Less fortunate 👍 *+1 XP*`
        users.exp += 1
    } else {
        end = `You lose 😥 *-${taruhan} XP*`
        users.exp -= taruhan
    }
    users.lastslot = new Date * 1
    return conn.sendButton(m.chat,
        `*[ 🎰 | SLOTS ]*

${end}

${x[0]} ${y[0]} ${z[0]}
${x[1]} ${y[1]} ${z[1]}
${x[2]} ${y[2]} ${z[2]}`.trim(), 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', `Slot ${args[0]}`, `.slot ${args[0]}`, m)
}
handler.help = ['slot <angka>']
handler.tags = ['game']
handler.command = /^(slots?)$/i

module.exports = handler 