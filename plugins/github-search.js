let fetch = require('node-fetch')

let handler = async(m, { text, command, usedPrefix }) => {
    if (!text) throw `Usage:\n${usedPrefix + command} <text>\n\nExample:\n${usedPrefix + command} Ajmal-Achu`
    let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
        q: text
    }))
    if (!res.ok) throws error
    let json = await res.json()
    let str = json.items.map((repo, index) => {
        return `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_Created on *${formatDate(repo.created_at)}*_
_Last update on *${formatDate(repo.updated_at)}*_
${repo.watchers} ${repo.forks} ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `
*Description:*\n${repo.description}` : ''}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim()
    }).join('\n\n')
    m.reply(str)
}
handler.help = ['githubsearch'].map(v => v + ' <search>')
handler.tags = ['tools']

handler.command = /^g(ithub|h)search$/i

module.exports = handler

function formatDate(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekdays: 'long',
        day: 'numeric',
        months: 'long',
        year: 'numeric',
        hour: 'numeric',
        minutes: 'numeric',
        second: 'numeric'
    })
}
