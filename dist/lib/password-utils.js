"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComplexPassword = exports.isLongPassword = exports.generatePassword = exports.validatePassword = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var global_constants_1 = require("./global-constants");
function validatePassword(password, hash) {
    return bcryptjs_1.default.compareSync(password, hash);
}
exports.validatePassword = validatePassword;
function generatePassword(password) {
    var salt = bcryptjs_1.default.genSaltSync(10);
    return bcryptjs_1.default.hashSync(password, salt);
}
exports.generatePassword = generatePassword;
var isLongPassword = function (password, length) {
    if (length === void 0) { length = 12; }
    return password.length >= length;
};
exports.isLongPassword = isLongPassword;
var isComplexPassword = function (password) {
    return global_constants_1.PASSWORD_REGEX.test(password);
};
exports.isComplexPassword = isComplexPassword;
