const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `You are already registered\nWant to re-register? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `example:\n*${usedPrefix + command}name.age*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Name cannot be empty (Alphanumeric)'
  if (!age) throw 'Age cannot be empty (Number)'
  age = parseInt(age)
  if (age > 70) throw 'Too old'
  if (age < 5) throw 'Babies can type in bjir format ._.'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
Registered successfully!

┌─〔 Info 〕
├ Name: ${name}
├ Age: ${age} Year's
├ SN: ${sn}
└────

save/star this message because SN (Serial Number) is used for re-registration `
.trim())
}
handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler

