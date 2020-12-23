
const middleware = require('./../../middleware');
const {helpMessage} = require('./../../constants').MESSAGES

module.exports = (bot) => {
    bot.command('/help',
        middleware.isChatTypePrivate,
        middleware.isSender,
        ctx =>{
        ctx.reply(helpMessage)
        }
    )
}

