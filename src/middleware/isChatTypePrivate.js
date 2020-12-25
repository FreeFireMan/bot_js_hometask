// Мідлварка для перевірки отримання повідомлень (команд) в особисті повідомлення боту

module.exports = async (ctx, next) => {
    try {
        if (ctx.chat.type === 'private') {
            next();
        } else {
            await ctx.reply('Це не приватний чат із ботом 🙂\nНапишіть боту в особисті повідомлення, дякуємо!');
        }
    } catch (e) {
        console.log(`My error in Middleware_isChatTypePrivate\n${e.message}`);
    }
};
