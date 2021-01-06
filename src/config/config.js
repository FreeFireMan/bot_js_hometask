module.exports = {
    TG:{
        TOKEN :  process.env.TG_TOKEN,
        REPORT_CHANNEL :  process.env.TG_REPORT_CHANNEL,
    },
    DB:{
        NAME : process.env.DB_NAME,
        USER : process.env.DB_USER,
        PASSWORD : process.env.DB_PASSWORD,
        HOST : process.env.DB_HOST,
        DIALECT : process.env.DB_DIALECT,
    },
    GOOGLE:{
        SPREADSHEETID: process.env.SPREADSHEETID,
        RANGE1: process.env.RANGE_LIST1,
        RANGE2: process.env.RANGE_LIST2,
        COLUMN_LIST2_1: process.env.RANGE_LIST2_FIRST_COLUMN,
        COLUMN_LIST3_1: process.env.RANGE_LIST3_FIRST_COLUMN,
        COLUMN_LIST_CHATS: process.env.RANGE_LIST_OF_CHATS,
    },

}
