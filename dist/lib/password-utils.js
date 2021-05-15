"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.validatePassword = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
function validatePassword(password, hash) {
    return bcryptjs_1.default.compareSync(password, hash);
}
exports.validatePassword = validatePassword;
function generatePassword(password) {
    var salt = bcryptjs_1.default.genSaltSync(10);
    return bcryptjs_1.default.hashSync(password, salt);
}
exports.generatePassword = generatePassword;
