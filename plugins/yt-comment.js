let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Use:\n${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command} this is a comment`
  conn.sendFile(m.chat, API('https://some-random-api.ml', '/canvas/youtube-comment', {
    avatar: await conn.getProfilePicture(m.sender).catch(_ => ''),
    comment: text,
    username: conn.getName(m.sender)
  }), 'file.png', '', m, 0, { thumbnail: Buffer.alloc(0) })
}

handler.help = ['ytcomment <text>']
handler.tags = ['maker']

handler.command = /^(ytcomment)$/i

module.exports = handler
