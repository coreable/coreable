"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = require("./app");
const sequelize_1 = require("./sequelize");
const config = __importStar(require("./config/config.json"));
// Data Generator
const generator_1 = require("./data/generator");
// import models
const User = __importStar(require("./models/User"));
const Industry = __importStar(require("./models/Industry"));
const Group = __importStar(require("./models/Group"));
const Team = __importStar(require("./models/Team"));
// init models
User.default;
Industry.default;
Group.default;
Team.default;
// run server
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.sequelize.authenticate();
    if (process.env.NODE_ENV === "development") {
        generator_1.generator.then(() => console.log('done'));
    }
    http_1.createServer(app_1.app).listen(config.HTTP.PORT, () => console.log(`Server running on port ${config.HTTP.PORT}`));
}))();
console.log(process.env.NODE_ENV);
