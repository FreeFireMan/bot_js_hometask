// Мідлварка для перевірки чи є користувач боту юзером, для змоги користуватись командами бота

const {userService} = require('../service')

module.exports = async (ctx, next) => {
    try {

        if (await userService.isAdmin(ctx.from.id)) {
            next();
        } else {
            await  ctx.reply('Ви немаете прав для цієї дії')
            //todo sending messages in report
            // throw new Error('User is not isSender');
        }
    } catch (e) {
        console.log(`My error in Middleware_isSender\n${e.message}`);
    }
};
