let yts = require('yt-search')

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Use:\n${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command}yts whatsappbot`
  let results = await yts(text)
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
*${v.title}* (${v.url})
Duration: ${v.timestamp}
Uploaded ${v.ago}
${v.views} Viewer
      `.trim()
      case 'channel': return `
*${v.name}* (${v.url})
_${v.subCountLabel} (${v.subCount}) Subscriber_
${v.videoCount} video
`.trim()
    }
  }).filter(v => v).join('\n========================\n')
  m.reply(teks)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^yts(earch)?$/i

module.exports = handler
