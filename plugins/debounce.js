let handler = async(m, { conn }) => {
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply('Resetting the Bot...\nPlease wait about 1 minute')
    await global.db.write()
    process.send('reset')
  } else throw '_eeeeiiiittssss..._'
}
handler.help = ['debounce' + (process.send ? '' : ' (Not Working)')]
handler.tags = ['host']
handler.command = /^debounce$/i

handler.owner = true

module.exports = handler
