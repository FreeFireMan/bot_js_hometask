// Створення бота через бібліотеку "Телеграф", встановлення токену

const Telegraf = require('telegraf');
const {TG} = require('../config')
const bot = new Telegraf(TG.TOKEN);

module.exports = {
    bot
};
