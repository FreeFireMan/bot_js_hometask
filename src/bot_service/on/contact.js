 const {userService} = require('../../service');
const {removeKeyboard} = require('../../constants').KEYBOARD

module.exports = (bot) => {
    bot.on('contact', async ctx => {
        ctx.reply("thank you for contact",removeKeyboard)

        if(await userService.isRegUser(ctx.from.id)){
            ctx.reply("You are already registered")
        }else{
        userService.createUser({...ctx.update.message.contact,...ctx.from})
        }
    });
}
