// Мідлварка для перевірки чи команда визивається у групі

module.exports = async (ctx, next) => {
    try {
        console.log('ctx.chat.type');
        console.log(ctx.chat.type);
        if (ctx.chat.type === 'group') {
            next();
        } else {
            await ctx.reply('Ця команда не використовувається тут');
        }
    } catch (e) {
        console.log(`My error in Middleware_iisChatTypeGroup\n${e.message}`);
    }
};
