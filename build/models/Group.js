"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
const User_1 = require("./User");
const Industry_1 = require("./Industry");
class Group extends sequelize_1.Model {
}
exports.Group = Group;
exports.default = Group.init({
    'groupID': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'primaryKey': true,
        'autoIncrement': true
    },
    'teamName': {
        'type': sequelize_1.DataTypes.STRING,
        'allowNull': false
    },
    'groupLeader': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'allowNull': false
    },
    'inviteCode': {
        'type': sequelize_1.DataTypes.STRING,
        'allowNull': false,
    },
    'industryID': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'allowNull': false
    }
}, {
    'tableName': 'GROUP',
    'sequelize': sequelize_2.sequelize
});
// Relations
Group.hasOne(User_1.User, { sourceKey: 'groupLeader', foreignKey: 'userID' });
Group.hasOne(Industry_1.Industry, { sourceKey: 'industryID', foreignKey: 'industryID' });
