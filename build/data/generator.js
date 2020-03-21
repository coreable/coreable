"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const faker_1 = __importDefault(require("faker"));
const Industry_1 = require("../models/Industry");
const User_1 = require("../models/User");
const Group_1 = require("../models/Group");
const Team_1 = require("../models/Team");
const sequelize_1 = require("../sequelize");
exports.generator = new Promise((resolve, reject) => {
    let p = new Promise((resolve) => {
        // Start the chain
        resolve();
    })
        .then(() => {
        // Drop the database tables and rebuild
        return sequelize_1.sequelize.sync({ force: true });
    })
        .then(() => {
        // Industry
        lodash_1.default.times(5, () => {
            return Industry_1.Industry.create({
                industryName: faker_1.default.company.companyName(),
            });
        });
    })
        .then(() => {
        // Users
        lodash_1.default.times(15, () => {
            const industryID = Math.floor(Math.random() * (5 - 1) + 1);
            return User_1.User.create({
                firstName: faker_1.default.name.firstName(),
                lastName: faker_1.default.name.lastName(),
                email: faker_1.default.internet.email(),
                industryID: industryID,
                cognitoID: faker_1.default.random.alphaNumeric(5)
            });
        });
    })
        .then(() => {
        // Groups
        lodash_1.default.times(5, () => {
            const groupLeader = Math.floor(Math.random() * (15 - 1) + 1);
            const industryID = Math.floor(Math.random() * (5 - 1) + 1);
            return Group_1.Group.create({
                teamName: faker_1.default.company.companyName(),
                groupLeader: groupLeader,
                inviteCode: faker_1.default.random.alphaNumeric(5),
                industryID: industryID
            });
        });
    })
        .then(() => {
        // Teams
        lodash_1.default.times(10, () => {
            const groupID = Math.floor(Math.random() * (5 - 1) + 1);
            const userID = Math.floor(Math.random() * (15 - 1) + 1);
            return Team_1.Team.create({
                userID: userID,
                groupID: groupID
            });
        });
    })
        .catch((err) => reject(err))
        .then(() => resolve());
});
