const fs = require('fs');
const path = require('path');

const {userService, chatService} = require('../../service')
const middleware = require('../../middleware')
const {TG: {TOKEN, REPORT_CHANNEL}} = require('../../config/config');

module.exports = (bot) => {

    bot.on('document',
        middleware.isChatTypePrivate,
        middleware.isUserReq,
        middleware.isFileType,
       ctx => {
           chatService.getChatByToken(TOKEN).then(
               idChat => {
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
                           ctx.telegram.sendMessage(REPORT_CHANNEL,'Error in ChekDocument')
                           ctx.telegram.sendMessage(REPORT_CHANNEL,err)
                       })
               }
           ).catch(err => {
               console.log('getChatByToken');
               ctx.telegram.sendMessage(REPORT_CHANNEL,err)
           })
            // const idChat = fs.readFileSync(path.join(process.cwd(), 'chat.txt'), "utf8")



        });
}
