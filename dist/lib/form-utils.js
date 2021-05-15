"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComplexPassword = exports.isLongPassword = exports.hasEmail = exports.renderForm = exports.hasValue = void 0;
var global_constants_1 = require("./global-constants");
// Form checking and rendering helper functions
var hasValue = function (prop, req) { return req.body[prop] && req.body[prop] !== ""; };
exports.hasValue = hasValue;
var renderForm = function (form, req, res, error, token) {
    var data = {
        csrfToken: req.csrfToken(),
        error: error
    };
    if (token) {
        data.token = token;
    }
    res.render(form, data);
};
exports.renderForm = renderForm;
var hasEmail = function (req) {
    return exports.hasValue("email", req);
};
exports.hasEmail = hasEmail;
var isLongPassword = function (password, length) {
    if (length === void 0) { length = 12; }
    return password.length >= length;
};
exports.isLongPassword = isLongPassword;
var isComplexPassword = function (password) {
    return global_constants_1.EMAIL_REGEX.test(password);
};
exports.isComplexPassword = isComplexPassword;
