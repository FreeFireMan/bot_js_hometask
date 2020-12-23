module.exports = (bot)=>{
    bot.launch({polling: {}})
        .then(() => console.log('Bot is started...'))
        .catch(reason => console.log(`Error in app js on start bot\n${reason}`));
}
