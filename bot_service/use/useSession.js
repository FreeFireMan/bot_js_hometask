const session = require('telegraf/session');
module.exports = (bot) => {
    bot.use(session())
}
