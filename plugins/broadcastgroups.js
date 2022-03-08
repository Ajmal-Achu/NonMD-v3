let fs = require('fs')
const dev = {
key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 2022,
                            itemCoun : 2022,
                            surface : 2022,
                            message: '「 All Group Broadcast 」',
                            orderTitle: 'B',
                            thumbnail: fs.readFileSync('./src/icon.jpg'), 
                            sellerJid: '0@s.whatsapp.net'

                          }
                        }
                      }
let handler  = async (m, { conn, dev,  text }) => {
  
  let fetch = require('node-fetch')
  const {
    MessageType,
    Mimetype
} = require("@adiwajshing/baileys");
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)}
    catch (e){
    }

  let groups = conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message && !v.announce).map(v => v.jid)
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  let content = await conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : teks + '\n\n' + '*「 ᴀʟʟ ᴄʜᴀᴛ ʙʀᴏᴀᴅᴄᴀsᴛ 」*')
  conn.reply(m.chat, `Send a broadcast message to ${groups.length} group`, dev)
  for (let id of groups) conn.copyNForward(id, content, 'conversation',{ quoted: dev ,thumbnail: fs.readFileSync('./src/icon.jpg'), contextInfo:{externalAdReply: {title: `ɴᴀɴᴅʜᴜᴛᴛʏ ʙʀᴏᴀᴅᴄᴀsᴛ` , body: '© ᴀᴊᴍᴀʟ-ᴀᴄʜᴜ', sourceUrl: '', thumbnail: fs.readFileSync('./src/icon.jpg')}},mp3:true} ,true)
  conn.reply(m.chat, `Done`, dev)
}
handler.help = ['broadcastgroup','bcgc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(bcgc)/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => require('crypto').randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
