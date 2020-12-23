const {firstMessage} = require('./../../constants').MESSAGES
const {contact} = require('./../../constants').KEYBOARD
const { userService } = require('./../../service')
module.exports = (bot) => {

    bot.start(ctx => {
        console.log(ctx.from);
        const {id} = ctx.from;
        userService.isRegUser(id).then(bool =>{
            if(bool){
                userService.getUserByID(id).then(user=>{
                     ctx.reply(`Наші вітання, ${user[2] || ''} ${user[1] || ''} `);
                })
            }else{
                ctx.reply(firstMessage,contact)
            }
        } )

    })
}
