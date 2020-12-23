require('dotenv').config();
// const db = require('./database').getInstance()
// db.setModels()
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');

// bot_use
const {useSession} = require('./bot_service/use');
useSession(bot);

//commands
const {launch,start,help,setForForwarding} = require('./bot_service/commands');

start(bot);
help(bot);
setForForwarding(bot);

//on
const {contact,checkDocument} = require('./bot_service/on');
contact(bot);
checkDocument(bot);


// catch errors
const {catchError} = require('./bot_service/catch');
catchError(bot)

// bot_launch
try {
    launch(bot);
}catch (e) {
    console.log(e);
}

//this part for lamda on aws

// exports.handler = (event,context,callback) => {
//
//     bot.handleUpdate(event);
//     return callback(null, {
//         status: 200,
//         body:"",
//     })
// };
