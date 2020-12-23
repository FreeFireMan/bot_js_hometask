module.exports = {

    removeKeyboard : {reply_markup: {remove_keyboard: true}},

    start_keyboard : {
        reply_markup: {
            one_time_keyboard: true,
            keyboard: [
                [{text: "Розпочати"}],
                [{text: "Зареєструватися", request_contact : true}],
                [{text: "Скасувати ❌"}]
            ]
        }
    },
     contact: {
        reply_markup: {
            one_time_keyboard: true,
            keyboard: [[{
                text: "Надіслати контактні дані ✔️",
                request_contact: true
            }], [{
                text: "Скасувати ❌",
            }]]
        }
    }
}
