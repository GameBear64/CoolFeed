import emojisJson from './emojis.json';

export default function emojiPicker(string) {
  let emojis = string.match(/:\w+:/gim);

  if (!emojis) return string;

  emojis.forEach(emote => {
    // console.log(emojisJson.map(em => `${em.aliases.join(', ')} -> ${em.emoji}`));

    let replacement = emojisJson.find(em => em.aliases.includes(emote.slice(1, -1)));
    if (!replacement) return;

    string = string.replace(emote, replacement?.emoji);
  });

  return string;
}
