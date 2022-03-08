let fetch = require("node-fetch");
let handler = async (m, { conn }) => {
  if (!db.data.settings.nsfw) throw "NSFW mode is not active";
  let res = await fetch(global.API("https://api.waifu.pics/", "/nsfw/waifu"));
  if (!res.ok) throw await `${res.status} ${res.statusText}`;
  let json = await res.json();
  if (json.url)
    conn.sendFile(
      m.chat,
      json.url,
      "Cartoons",
      "how come the same cartoon, stress ....",
      m
    );
  else throw json;
};
handler.help = ["nsfwwaifu", "waifunsfw"];
handler.tags = ["fun"];

handler.command = /^(nsfw|waifunsfw)$/i;

handler.limit = true;

module.exports = handler;
