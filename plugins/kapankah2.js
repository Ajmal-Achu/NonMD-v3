let handler = async (m, { conn, command, text }) => {
  m.reply(`
*Question:* ${command} ${text}?
*Answer:* ${Math.floor(Math.random() * 10)} ${conn.pickRandom(['second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'century'])} more ...
`.trim())
}
handler.help = ['', 'kah'].map(v => 'kapan' + v + ' <pertanyaan>')
handler.tags = ['shell']
handler.command = /^kapan(kah)?$/i

module.exports = handler 
