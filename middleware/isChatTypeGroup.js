// Мідлварка для перевірки чи команда визивається у групі

module.exports = async (ctx, next) => {
    try {
        const {type} = ctx.chat;
        if (type === 'group' || 'supergroup') {
            next();
        } else {
            await ctx.reply('Ця команда не використовувається тут');
        }
    } catch (e) {
        console.log(`My error in Middleware_iisChatTypeGroup\n${e.message}`);
    }
};
