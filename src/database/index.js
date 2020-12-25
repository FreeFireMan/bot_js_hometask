const {config:{DB}} = require('../config')

const Sequelize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
            host: 'localhost',
            dialect: 'mysql'
        });

        const models = {};

        function getModels() {
            fs.readdir('./database/model', (err, file) => {
                file.forEach(file => {
                    console.log(file);
                    const modelName = file.split('.')[0];
                    models[modelName] = client.import(resolve(`./database/model/${modelName}`))
                })
            })
        }


        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    }
})();
