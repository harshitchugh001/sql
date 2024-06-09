
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Question = require('./Question');
const AnswerOption = require('./AnswerOption');

const CorrectAnswer = sequelize.define('CorrectAnswer', {
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
    correct_answer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: AnswerOption,
            key: 'id'
        }
    }
});

CorrectAnswer.belongsTo(Question, { foreignKey: 'question_id' });
CorrectAnswer.belongsTo(AnswerOption, { foreignKey: 'correct_answer_id' });

module.exports = CorrectAnswer;
