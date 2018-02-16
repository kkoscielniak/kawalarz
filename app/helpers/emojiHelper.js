const emotion = require('emoji-emotion');

const happyEmojiList = emotion.filter(emoji => emoji.polarity > 1);
const sadEmojiList = emotion.filter(emoji => emoji.polarity < -1);

/**
 * Returns emoji considered as positive one
 * @return {string} emoji
 */
module.exports.getHappyEmoji = () => happyEmojiList[Math.floor(Math.random() * happyEmojiList.length)].emoji;

/**
 * Returns emoji considered as negative one
 * @return {string} emoji
 */
module.exports.getSadEmoji = () => sadEmojiList[Math.floor(Math.random() * sadEmojiList.length)].emoji;
