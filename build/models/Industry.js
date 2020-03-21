"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Industry extends sequelize_1.Model {
}
exports.Industry = Industry;
exports.default = Industry.init({
    'industryID': {
        'type': sequelize_1.DataTypes.INTEGER.UNSIGNED,
        'autoIncrement': true,
        'primaryKey': true,
    },
    'industryName': {
        'type': sequelize_1.DataTypes.STRING,
        'allowNull': false
    }
}, {
    'tableName': 'INDUSTRY',
    'sequelize': sequelize_2.sequelize
});
