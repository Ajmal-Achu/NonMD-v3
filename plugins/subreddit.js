let fetch = require('node-fetch')

let handler = async (m, { conn, text, isOwner }) => {
  let res = await fetch(API('https://meme-api.herokuapp.com', '/gimme/' + encodeURI(text || ''), {}))
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.url) throw 'Media not found!'
  if (json.nsfw && !db.data.settings[conn.user.jid].nsfw) return conn.sendButton(m.chat, 'NSFW!', '© ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', isOwner ? 'Turn on' : 'Donation', isOwner ? '.1 nsfw' : '.donasi')
  await conn.sendFile(m.chat, json.url, text, json.title, m)
}
handler.help = ['subreddit <search>']
handler.tags = ['internet']
handler.command = /^(sr|subreddit)$/i

module.exports = handler