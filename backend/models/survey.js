const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Survey = sequelize.define('Survey', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Survey;