let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return await conn.sendButton(m.chat, `Tidak ada absen berlangsung!`.trim(), 'Ⓒ︎Ⓗ︎Ⓘ︎Ⓝ︎Ⓣ︎Ⓤ︎ 🅑︎🅞︎🅣︎', 'Mulai', `${usedPrefix}mulaiabsen`, m)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
Tanggal: ${date}

${conn.absen[id][2]}
    
┌「 *Absen* 」 
├ Total: ${absen.length}
${list} 
└────`.trim()
    await conn.send2Button(m.chat, caption, 'ɴᴀɴᴅʜᴜᴛᴛʏ ᴠ3', 'Hadir', `${usedPrefix}absen`, 'Hapus', `${usedPrefix}-absen`, m)
}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^cekabsen$/i

module.exports = handler
