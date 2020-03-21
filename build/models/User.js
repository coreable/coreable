"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
const Industry_1 = require("./Industry");
class User extends sequelize_1.Model {
}
exports.User = User;
exports.default = User.init({
    'userID': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'autoIncrement': true,
        'primaryKey': true
    },
    'firstName': {
        'type': sequelize_1.DataTypes.STRING,
        'allowNull': false
    },
    'lastName': {
        'type': sequelize_1.DataTypes.STRING,
        'allowNull': false
    },
    'email': {
        'type': sequelize_1.DataTypes.STRING,
        'allowNull': false,
        'validate': {
            'isEmail': true
        }
    },
    'industryID': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'allowNull': false
    },
    'cognitoID': {
        'type': sequelize_1.DataTypes.STRING,
        'allowNull': false
    }
}, {
    'tableName': 'USER',
    'sequelize': sequelize_2.sequelize
});
// Relations
User.hasOne(Industry_1.Industry, { sourceKey: 'industryID', foreignKey: 'industryID' });
