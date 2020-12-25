// Сцена для
const {userService} = require('./../../service');


const WizardScene = require('telegraf/scenes/wizard');

const sendingMessageForAll = new WizardScene('send_messages',
    firstStep,
    secondStep,
);

sendingMessageForAll.leave(async (ctx) =>
    await ctx.reply('Вихід з 🐾 /sendingMessage'),
);

async function firstStep(ctx) {
    try {
        ctx.reply('Давай свій месадж, я розішлю його всім')
        return ctx.wizard.next()
    } catch (e) {
        console.log(`My error in scenes_sendingMessageForAll_1\n${e.message}`);
    }
}

async function secondStep(ctx) {
    try {
        const rejectMsgId = []
        const allUsers = await userService.getIdAllUsers()
        ctx.reply('Почав розсилку')

        console.log('-------------------forwardMessage----------------------------------------------');
        for (let i = 0; i< allUsers.length; i++){
            try {

                await ctx.forwardMessage(allUsers[i],ctx.from.id, ctx.message_id)

            } catch (e) {
                rejectMsgId.push(`${allUsers[i]} := ${e.description} \n`)
                console.error('this id not valid '+allUsers[i]+' '+e.description);
            }
        }
        console.log('-------------------forwardMessage----------------------------------------------');

        ctx.reply('Закончил')
        rejectMsgId.length > 0 && ctx.reply('для этих пользователей сообщение не было доставленно \n' + rejectMsgId )

        await ctx.scene.leave();

    } catch (e) {
        console.log(`My error in scenes_sendingMessageForAll_2\n${e.message}`);
    }
}

const {stage} = require('../../config/stage/stages');
stage.register(sendingMessageForAll);

module.exports = stage;
