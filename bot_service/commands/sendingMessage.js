
const middleware = require('./../../middleware');

module.exports = (bot) => {
    bot.command('/send_messages',
        middleware.isChatTypePrivate,
        middleware.isSender,
        ctx =>{ctx.scene.enter('send_messages')}
    )
}

