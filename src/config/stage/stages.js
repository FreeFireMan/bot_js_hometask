// Створення стецен

const Stage = require('telegraf/stage');
const stage = new Stage();
const {leave} = Stage;

stage.command('cancel', leave());

module.exports = {
    stage
};
