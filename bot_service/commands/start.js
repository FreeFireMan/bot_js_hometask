const {firstMessage} = require('./../../constants').MESSAGES
const {contact} = require('./../../constants').KEYBOARD
module.exports = (bot) => {

    bot.start(ctx => {
        ctx.reply(firstMessage,contact)
        console.log(ctx.from);
    })
}
