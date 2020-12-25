// SCENES
const scenes = require('../../scenes');

module.exports = (bot) => {
    bot.use(scenes.sendingMessage.sendingMessageForAll)
}
