// const db = require('../database').getInstance();
// const ControllerError = require('../error/ControllerError');
const {google: {client: googleAuthUtil}} = require('../config')
const {google} = require('googleapis');
const {GOOGLE, TG} = require('../config/config');

// const db = require('./../database').getInstance()


class ChatService {

    constructor() {

    }

    addindChat(objChat, objUser) {
        try {

            return googleAuthUtil.authorize()
                .then(autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return sheets.spreadsheets.values.append({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.COLUMN_LIST_CHATS,
                        valueInputOption: 'USER_ENTERED',
                        insertDataOption: 'INSERT_ROWS',
                        resource: {
                            values: [
                                [
                                    TG.TOKEN,
                                    objChat.id,
                                    objChat.title,
                                    objUser.id,
                                    objUser.first_name,
                                    objUser.last_name,
                                    objUser.username,
                                    new Date().toDateString(),
                                    new Date().toTimeString().split(' ')[0]],

                            ],

                        }
                    }).then(response => response.status)
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }

    // logUserFileSending(userObj) {
    //     try {
    //         // console.log(userObj);
    //         return googleAuthUtil.authorize()
    //             .then(autClient => {
    //                 const sheets = google.sheets({version: 'v4', auth: autClient});
    //                 return sheets.spreadsheets.values.append({
    //                     spreadsheetId: GOOGLE.SPREADSHEETID,
    //                     range: GOOGLE.RANGE1,
    //                     valueInputOption: 'USER_ENTERED',
    //                     insertDataOption: 'INSERT_ROWS',
    //                     resource: {
    //                         values: [
    //                             [
    //                                 userObj.id,
    //                                 userObj.first_name,
    //                                 userObj.last_name,
    //                                 userObj.username,
    //                                 userObj.file_name,
    //                                 new Date().toDateString(),
    //                                 new Date().toTimeString().split(' ')[0]]
    //                         ],
    //
    //                     }
    //                 }).then(response => response.status)
    //             })
    //     } catch (e) {
    //         console.log(e);
    //         // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
    //     }
    // }
    //
    getChatByToken(token) {

        try {
            // console.log(token);
            return googleAuthUtil.authorize()
                .then(async autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return await sheets.spreadsheets.values.get({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.COLUMN_LIST_CHATS,
                    }).then(response => {
                        const {data: {values}} = response

                        return values.find(value => value[0] === token)[1]
                    })
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }

}

module.exports = new ChatService();
