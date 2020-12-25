module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data_id: {
            type: DataTypes.INTEGER,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.STRING,
            unique: true
        },
        is_admin: {
            type: DataTypes.BOOLEAN
        },
        is_user: {
            type: DataTypes.BOOLEAN
        },
        is_video_master: {
            type: DataTypes.BOOLEAN
        },
        password: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'user',
        timestamps: false
    });
};
