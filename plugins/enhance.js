const fetch = require('node-fetch')
const FormData = require('form-data')

let handler = async(m, { command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Send/reply image with command *${usedPrefix + command}*`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} is not supported`
  let img = await q.download()
  let body = new FormData
  body.append('image', img, 'image')
  let res = await fetch('http://max-image-resolution-enhancer.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud/model/predict', {
    methods: 'POST',
    body
  })
  if (!res.ok) throw error
  await conn.sendFile(m.chat, await res.buffer(), 'hd.jpg', '', m)
}
handler.help = ['hd', 'enhance']
handler.tags = ['tools']
handler.command = /^(hd|enhance)$/i

module.exports = handler
