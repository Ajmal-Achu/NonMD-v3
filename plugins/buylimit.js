const xpperlimit = 350

let handler = async(m, { conn, command, args, usedPrefix }) => {
  let count = command.replace(/^buy/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (isNaN(count)) throw `numbers only!\n\nUsage:\n${usedPrefix + command} <number>\n\nExample:\n${usedPrefix + command} 5`
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xpperlimit * count
    global.db.data.users[m.sender].limit += count
    conn.reply(m.chat, `-${xpperlimit * count} XP\n+ ${count} Limit`, m)
  } else conn.reply(m.chat, `Insufficient XP to buy ${count} limit`, m)
}
handler.help = ['buy<amount of limit>', 'buy <amount of limit>', 'buyall']
handler.tags = ['xp']
handler.command = /^buy([0-9]+)|buy|buyall$/i

module.exports = handler
