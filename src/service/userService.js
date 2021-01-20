// const db = require('../database').getInstance();
// const ControllerError = require('../error/ControllerError');
const {google:{client: googleAuthUtil}} = require('../config')
const {google} = require('googleapis');
const {GOOGLE} = require('../config/config');
// const db = require('./../database').getInstance()


class UserService {

    constructor() {

    }

    createUser(userObj) {

        try {
            // console.log(userObj);
            // db.getModel('user').create(userObj)
            //     .then(res => {
            //         console.log('------------------------');
            //         console.log(res);
            //         console.log('------------------------');
            //     })
            return googleAuthUtil.authorize()
                .then(autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return sheets.spreadsheets.values.append({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.RANGE2,
                        valueInputOption: 'USER_ENTERED',
                        insertDataOption: 'INSERT_ROWS',
                        resource: {
                            values: [
                                [
                                    userObj.user_id,
                                    userObj.first_name,
                                    userObj.last_name,
                                    userObj.username,
                                    userObj.phone_number,
                                    new Date().toDateString(),
                                    new Date().toTimeString().split(' ')[0]]
                            ],

                        }
                    }).then(response => response.status)
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }

    logUserFileSending(userObj) {
        try {
            console.log(userObj);
            return googleAuthUtil.authorize()
                .then(autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return sheets.spreadsheets.values.append({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.RANGE1,
                        valueInputOption: 'USER_ENTERED',
                        insertDataOption: 'INSERT_ROWS',
                        resource: {
                            values: [
                                [
                                    userObj.id,
                                    userObj.first_name,
                                    userObj.last_name,
                                    userObj.username,
                                    userObj.file_name ,
                                    new Date().toDateString(),
                                    new Date().toTimeString().split(' ')[0]]
                            ],

                        }
                    }).then(response => response.status)
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }

    isRegUser(id) {

        try {
            // console.log(id);
            return googleAuthUtil.authorize()
                .then(async autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return await sheets.spreadsheets.values.get({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.COLUMN_LIST2_1,
                    }).then(response => {
                        const {data: {values}} = response
                        return !!values.find(value => +value[0] === id)
                    })
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }
    isAdmin(id) {
        try {
            // console.log(id);
            return googleAuthUtil.authorize()
                .then(async autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return await sheets.spreadsheets.values.get({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.COLUMN_LIST3_1,
                    }).then(response => {
                        const {data: {values}} = response
                        return !!values.find(value => +value[0] === id)
                    })
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }

    getIdAllUsers() {

        try {
            // console.log(userObj);
            return googleAuthUtil.authorize()
                .then(async autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return await sheets.spreadsheets.values.get({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.COLUMN_LIST2_1,
                    }).then(response => {
                        const {data: {values}} = response

                        return values.map(value => value[0]).slice(1)
                    })
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }

    getUserByID(id) {

        try {
             console.log(id);
            return googleAuthUtil.authorize()
                .then(async autClient => {
                    const sheets = google.sheets({version: 'v4', auth: autClient});
                    return await sheets.spreadsheets.values.get({
                        spreadsheetId: GOOGLE.SPREADSHEETID,
                        range: GOOGLE.RANGE2,
                    }).then(response => {
                        const {data: {values}} = response

                        return values.find(value => +value[0] === id)
                    })
                })
        } catch (e) {
            console.log(e);
            // throw new ControllerError("MY MSG ERORR: " + e, 500, 'userService/createUser')
        }
    }

}

module.exports = new UserService();
