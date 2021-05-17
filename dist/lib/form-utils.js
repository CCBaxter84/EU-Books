"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasEmail = exports.renderForm = exports.hasValue = void 0;
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
