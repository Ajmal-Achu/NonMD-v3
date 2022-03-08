let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `uhm.. what are you looking for?\n\nExample:\n${usedPrefix + command} dandelions`
  let res = await fetch(global.API('bx', '/api/music/liriklagu', { query: text }, 'apikey'))
  if (!res.ok) throw await `${res.status} ${res.statusText}`
  let json = await res.json()
  if (!json.status) throw json
  m.reply(json.result)
}
handler.help = ['lirik'].map(v => v + ' <text>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics?)$/i

module.exports = handler
