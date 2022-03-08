const axios = require("axios")
const up = require("../lib/uploadImage")
const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')

let handler = async(m, { conn, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if(!(/image/.test(mime))) return m.reply(`reply to image with caption *.sfire*`)
    let img = await q.download()
    img = `https://api.zeks.me/api/burning-image?apikey=administrator&image=${await up(img)}`
    m.reply(`wait...`)
    if (!img) throw `reply to image with caption *${usedPrefix + command}*`
    stiker = await sticker(null, img, global.packname, global.author)
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw 'Failed to make a sticker, it looks like something is wrong!'
  }
}


handler.help = ["sfire", "stickerfire", "stikerfire"].map(v => v + " [reply/send picture]")
handler.tags = ['sticker']
handler.command = /^((s|sticker|stiker)?fire)/i
handler.limit = true

module.exports = handler

