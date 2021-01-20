
const {userService, chatService} = require('../../service')
const middleware = require('../../middleware')
const {TG: {TOKEN, REPORT_CHANNEL}} = require('../../config/config');

module.exports = (bot) => {

    bot.on('message',
        middleware.isChatTypePrivate,
        middleware.isUserReq,
        // middleware.isFileType,
        ctx => {

            const {from,updateSubTypes} = ctx
            chatService.getChatByToken(TOKEN).then(
                idChat => {
                    const userObj = {...from, file_name: updateSubTypes.join(' ')+' проверять не нужно'}

                    userService.logUserFileSending(userObj)

                    ctx
                        .forwardMessage(idChat, ctx.message.id)
                        .then(() => {
                            ctx.reply('message is forwarding')
                        })
                        .catch(err => {
                            console.log(err);
                            ctx.reply('message is NOT forwarding')
                            ctx.telegram.sendMessage(REPORT_CHANNEL,'Error in ChekMessage')
                            ctx.telegram.sendMessage(REPORT_CHANNEL,err)
                        })
                }
            ).catch(err => {
                console.log('getChatByToken');
                ctx.telegram.sendMessage(REPORT_CHANNEL,err)
            })


        });
}
