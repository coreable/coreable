"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
const User_1 = require("./User");
class Review extends sequelize_1.Model {
}
exports.default = Review.init({
    'reviewID': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    'subjectID': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    'completedBy': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    'emotionalResponse': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    'empathy': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'managesOwn': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'faith': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'cooperatively': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'positiveBelief': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'resilienceFeedback': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'calm': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'change': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'newIdeas': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'workDemands': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'proactive': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'influences': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'clearInsructions': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'preventsMisunderstandings': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'easilyExplainsComplexIdeas': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'openToShare': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'tone': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'crossTeam': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'distractions': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'eyeContact': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'signifiesInterest': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    'verbalAttentiveFeedback': {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    }
}, {
    'tableName': 'REVIEW',
    'sequelize': sequelize_2.sequelize
});
// Relations
Review.hasOne(User_1.User, { sourceKey: 'subjectID', foreignKey: 'userID' });
Review.hasOne(User_1.User, { sourceKey: 'comppletedBy', foreignKey: 'userID' });
