// Мідлварка для перевірки чи mimeType document for forwarding
const {
    FILETYPE: fileType
} = require('../constants')
const {TG: {REPORT_CHANNEL}} = require('../config/config')

module.exports = async (ctx, next) => {
    try {
        const {file_name,mime_type} = ctx.message.document
        const file_type = file_name.split('.').pop()
        if (file_type === fileType.HTML
            || file_type === fileType.CSS
            || file_type === fileType.RAR
            || file_type === fileType.ZIP
            || file_type === fileType.Z7
            || file_type === fileType.JS
            // || file_type === fileType.TAR
        ) {
            next();
        } else {
            console.log('-----------START-----------------------isFileType--------------------------------');
            console.log("ctx.message", ctx.message);
            console.log('-----------END-----------------------isFileType----------------------------------');

            ctx.reply('file is not accessing of this type: ' + file_type + '\n'
            +'permitted file type is: rar, zip, 7z, js, html, css ')

            const reportMsg = 'file_name: '+file_name+'\n'
                                +'mime_type: '+mime_type+'\n'
                                +'userID: '+ctx.from.id
            ctx.telegram.sendMessage(REPORT_CHANNEL,reportMsg)
        }
    } catch (e) {
        console.log(`My error in Middleware_isMimeType\n${e.message}`);
    }
};
