const middleware = require('../../middleware')
const { chatService } = require('../../service')
const {TG: {TOKEN, REPORT_CHANNEL}} = require('../../config/config');

module.exports = (bot) => {
    bot.command('/set_up',
        middleware.isChatTypeGroup,
        ctx => {
            console.log(ctx.from);
            chatService
                .addindChat(ctx.chat,ctx.from)
                .catch(error=>{

            })
            ctx.reply('it is ' + ctx.chat.title);
        }
    )
}
