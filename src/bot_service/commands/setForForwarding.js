const fs = require('fs');
const path = require('path');
const middleware = require('../../middleware')

module.exports = (bot) => {
    bot.command('/set_up',
        middleware.isChatTypeGroup,
        ctx => {
            fs.writeFileSync(path.join(process.cwd(), 'chat.txt'), ctx.chat.id)
            ctx.reply('it is ' + ctx.chat.title);
        }
    )
}
