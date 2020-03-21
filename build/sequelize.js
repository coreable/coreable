"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = __importStar(require("./config/config.json"));
exports.sequelize = new sequelize_1.Sequelize(config.DATABASE.SCHEMA, //database
config.DATABASE.USERNAME, //username
config.DATABASE.PASSWORD, //password
{
    'dialect': 'mysql',
    'host': config.DATABASE.HOST,
    'port': config.DATABASE.PORT
});
