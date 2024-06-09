
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Question = require('./Question');

const AnswerOption = sequelize.define('AnswerOption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Question,
            key: 'id'
        }
    },
    option_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    next_question_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

AnswerOption.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = AnswerOption;
