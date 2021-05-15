"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Import dependencies
var express_1 = require("express");
var passport_1 = __importDefault(require("../config/passport"));
var auth_1 = require("../lib/middleware/auth");
var forms_1 = require("../lib/middleware/forms");
var error_utils_1 = require("../lib/error-utils");
// Define and export router
exports.router = express_1.Router();
// @route   GET /login
// @desc    Render Log In form
// @access  Public
exports.router.get("/", auth_1.isNotAlreadyLoggedIn, function (req, res) {
    res.render("auth/login", { csrfToken: req.csrfToken(), isAuth: false });
});
// @route   POST /login
// @desc    Submit and authenticate username and password
// @access  Public
exports.router.post("/", forms_1.loginFormChecker, function (req, res, next) {
    passport_1.default.authenticate("local", function (error, user, info) {
        if (error) {
            res.render("auth/login", {
                error: error,
                csrfToken: req.csrfToken()
            });
        }
        else if (!user) {
            res.render("auth/login", {
                error: "Error: Invalid username or password",
                csrfToken: req.csrfToken()
            });
        }
        else {
            user.save();
            req.logIn(user, function (error) {
                if (error) {
                    error_utils_1.renderError("server-err", res, false);
                }
                res.redirect("/");
            });
        }
    })(req, res, next);
});
