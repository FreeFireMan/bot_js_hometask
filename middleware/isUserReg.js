// Мідлварка для перевірки чи є користувач боту юзером, для змоги користуватись командами бота

const {userService} = require('./../service')

module.exports = async (ctx, next) => {
    try {

        if (await userService.isRegUser(ctx.from.id)) {
            next();
        } else {
            await  ctx.reply('Ви повинні дати свій контакт, кнопка знизу')
            throw new Error('User is not User');
        }
    } catch (e) {
        console.log(`My error in Middleware_isUserReq\n${e.message}`);
    }
};
