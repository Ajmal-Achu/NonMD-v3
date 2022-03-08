let handler = async(m, { conn }) => {
    let user = db.data.users[m.sender]
    if (user.warning == 0) throw 'You have no warning!'

    let time = user.lastIstigfar + 180000
    if (new Date - user.lastIstigfar < 180000) throw `You can use this command again after ${conn.msToTime(time - new Date())}`
    user.warning -= 1
    m.reply(`Warning: ${user.warning} / 5`)
    user.lastIstigfar = new Date * 1
}
handler.command = /^(astagh?fir(ullah)?|sorry)$/i

handler.limit = 1

module.exports = handler
