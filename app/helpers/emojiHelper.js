const emotion = require('emoji-emotion');

const happyEmoji = emotion.filter(emoji => emoji.polarity > 1);
const sadEmoji = emotion.filter(emoji => emoji.polarity < -1);

module.exports.getHappyEmoji = () => happyEmoji[Math.floor(Math.random() * sadEmoji.length)].emoji;
module.exports.getSadEmoji = () => sadEmoji[Math.floor(Math.random() * sadEmoji.length)].emoji;
