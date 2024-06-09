
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Survey = require('./Survey');

const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    survey_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Survey,
            key: 'id'
        }
    },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Question.belongsTo(Survey, { foreignKey: 'survey_id' });

module.exports = Question;
