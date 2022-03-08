let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {
  if (text) {
    if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    db.data.chats[m.chat].sBye = text
    m.reply('Bye set successfully\n@user (Mention)')
  } else throw `Use :\n${usedPrefix + command} <text>\n\nExample :\n${usedPrefix + command} byebye @user`
}
handler.help = ['setbye <text>']
handler.tags = ['owner', 'group']
handler.command = /^setbye$/i

module.exports = handler 