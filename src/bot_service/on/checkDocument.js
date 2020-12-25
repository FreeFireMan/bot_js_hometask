const fs = require('fs');
const path = require('path');

const {userService} = require('../../service')
const middleware = require('../../middleware')

module.exports = (bot) => {

    bot.on('document',
        middleware.isChatTypePrivate,
        middleware.isUserReq,
        middleware.isFileType,
        ctx => {
            const idChat = fs.readFileSync(path.join(process.cwd(), 'chat.txt'), "utf8")

            const userObj = {...ctx.from, ...ctx.message.document}

            userService.logUserFileSending(userObj)

            ctx
                .forwardMessage(idChat, ctx.message.id)
                .then(() => {
                    ctx.reply('file is forwarding')
                })
                .catch(err => {
                    console.log(err);
                    ctx.reply('file is NOT forwarding')
                })
        });
}
