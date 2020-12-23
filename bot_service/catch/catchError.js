module.exports = (bot) => {

    bot.catch(err => {
        console.log('-----------this catchError start-----------');
        console.log(err);
        console.log('-----------this catchError end-----------');

    })
}
