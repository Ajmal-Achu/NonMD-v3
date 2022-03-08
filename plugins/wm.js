const { sticker5 } = require('../lib/sticker')
const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let stiker = false
  try {
    let [packname, ...author] = text.split`|`
    author = (author || []).join`|`
    let q = m.quoted ? m.quoted : m
    let mime = m.quoted.mimetype || ''
    if (/webp/.test(mime)) {
      let img = await q.download()
      let out = await uploadFile(img)
      stiker = await sticker5(0, out, packname || '', author || '')
    } else if (/image/.test(mime)) {
      let img = await q.download()
      let out = await uploadImage(img)
      stiker = await sticker5(0, out, packname || '', author || '')
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('max 10 sec!')
      let img = await q.download()
      let out = await uploadImage(img)
      stiker = await sticker5(0, out, packname || '', author || '')
    }
  } finally {
    if (stiker) await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
    else throw `Reply sticker with command *${usedPrefix + command} <text>|<text>*`
  }
}
handler.help = ['wm <text>|<text>']
handler.tags = ['sticker']
handler.command = /^(wm)$/i

handler.limit = 1

module.exports = handler
