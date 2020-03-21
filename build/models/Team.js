"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
const User_1 = require("./User");
const Group_1 = require("./Group");
class Team extends sequelize_1.Model {
}
exports.Team = Team;
exports.default = Team.init({
    'userID': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'allowNull': false
    },
    'groupID': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'allowNull': false
    }
}, {
    'tableName': 'TEAM',
    'sequelize': sequelize_2.sequelize
});
// Relations
Team.hasOne(User_1.User, { sourceKey: 'userID', foreignKey: 'userID' });
Team.hasOne(Group_1.Group, { sourceKey: 'groupID', foreignKey: 'groupID' });
