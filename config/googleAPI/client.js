const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
const {GOOGLE} = require('../config');


let client_secret_part = 'credentials.json';
let gSheet = 'gSheet1.json';

const SCOPES = [
    // 'https://www.googleapis.com/auth/drive',
    // 'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
];
let TOKEN_DIR = `config${path.sep}filesforSheet${path.sep}`;
let TOKEN_PATH = TOKEN_DIR + `${gSheet}`;

// Single instance variable
let oAuth2Client = null;

function authorize() {
    return new Promise((resolve, reject) => {
        if (null === oAuth2Client) {
            fs.readFile(`config${path.sep}filesforSheet${path.sep}${client_secret_part}`,
                (err, content) => {
                    if (err) {
                        console.log("Error loading client secret file:", err);
                        reject();
                    }
                    // Authorize a client with credentials, then call the Google Sheets API.
                    const credentials = JSON.parse(content);
                    const { client_secret, client_id, redirect_uris } = credentials.installed;
                    oAuth2Client = new google.auth.OAuth2(
                        client_id,
                        client_secret,
                        redirect_uris[0]
                    );

                    fs.readFile(TOKEN_PATH, (err, token) => {
                        if (err) getNewToken(oAuth2Client, resolve);
                        else {
                            oAuth2Client.setCredentials(JSON.parse(token));
                            resolve(oAuth2Client);
                        }
                    });
                });
        } else {
            resolve(oAuth2Client);
        }
    });
}

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter the code from that page here: ", code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                return console.error(
                    "Error while trying to retrieve access token",
                    err
                );
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

module.exports = {
    authorize: authorize
};
