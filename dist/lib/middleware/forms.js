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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.isStrongPassword = exports.passwordsNotEmpty = exports.isValidEmail = exports.checkResetForm = exports.checkForUserName = exports.checkForEmail = exports.regFormChecker = exports.loginFormChecker = exports.authorFormChecker = void 0;
var user_1 = __importDefault(require("../../models/user"));
var form_utils_1 = require("../form-utils");
var global_constants_1 = require("../global-constants");
var authorFormChecker = function (req, res, next) {
    var form = "authors/new";
    var isAuth = req.isAuthenticated();
    if (form_utils_1.hasValue("name", req)) {
        next();
    }
    else {
        res.render(form, {
            csrfToken: req.csrfToken(),
            error: global_constants_1.EMPTY_FORM_ERR,
            isAuth: isAuth
        });
    }
};
exports.authorFormChecker = authorFormChecker;
var loginFormChecker = function (req, res, next) {
    var form = "auth/login";
    if (!form_utils_1.hasValue("username", req)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.NO_USERNAME_ERR);
    }
    else if (!form_utils_1.hasValue("password", req)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.NO_PASSWORD_ERR);
    }
    else {
        next();
    }
};
exports.loginFormChecker = loginFormChecker;
var regFormChecker = function (req, res, next) {
    var form = "auth/register";
    if (!form_utils_1.hasValue("email", req)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.NO_EMAIL_ERR);
    }
    else if (!form_utils_1.hasValue("username", req)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.NO_USERNAME_ERR);
    }
    else if (!form_utils_1.hasValue("password", req)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.NO_PASSWORD_ERR);
    }
    else {
        next();
    }
};
exports.regFormChecker = regFormChecker;
var checkForEmail = function (req, res, next) {
    var form = "auth/register";
    user_1.default.find({ email: req.body.email }, function (error, user) {
        if (error) {
            form_utils_1.renderForm(form, req, res, global_constants_1.DB_LOOKUP_ERR);
        }
        else if (user.length >= 1) {
            form_utils_1.renderForm(form, req, res, global_constants_1.EMAIL_EXISTS_ERR);
        }
        else {
            next();
        }
    });
};
exports.checkForEmail = checkForEmail;
var checkForUserName = function (req, res, next) {
    var form = "auth/register";
    user_1.default.find({ username: req.body.username }, function (error, user) {
        if (error) {
            form_utils_1.renderForm(form, req, res, global_constants_1.DB_LOOKUP_ERR);
        }
        else if (user.length >= 1) {
            form_utils_1.renderForm(form, req, res, global_constants_1.USERNAME_EXISTS_ERR);
        }
        else {
            next();
        }
    });
};
exports.checkForUserName = checkForUserName;
var checkResetForm = function (req, res, next) {
    var form = "reset/reset";
    if (!form_utils_1.hasValue("email", req)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.NO_EMAIL_ERR);
    }
    else {
        next();
    }
};
exports.checkResetForm = checkResetForm;
var isValidEmail = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var form, user, err_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    form = "reset/reset";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_1.default.findOne({ email: req.body.email })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        throw global_constants_1.INVALID_EMAIL_ERR;
                    }
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    error = err_1 === global_constants_1.INVALID_EMAIL_ERR ? global_constants_1.INVALID_EMAIL_ERR : global_constants_1.DB_LOOKUP_ERR;
                    form_utils_1.renderForm(form, req, res, error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.isValidEmail = isValidEmail;
var passwordsNotEmpty = function (req, res, next) {
    var token = req.params.token;
    var form = "reset/reset-confirm";
    if (!form_utils_1.hasValue("password", req) || !form_utils_1.hasValue("confirm", req)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.NO_PASSWORD_ERR, token);
    }
    else {
        next();
    }
};
exports.passwordsNotEmpty = passwordsNotEmpty;
var isStrongPassword = function (req, res, next) {
    var form = "auth/register";
    var minPasswordLength = 12;
    var password = req.body.password;
    var shortPasswordErr = "Password must be at least " + minPasswordLength + " characters";
    if (!form_utils_1.isLongPassword(password, minPasswordLength)) {
        form_utils_1.renderForm(form, req, res, shortPasswordErr);
    }
    else if (!form_utils_1.isComplexPassword(password)) {
        form_utils_1.renderForm(form, req, res, global_constants_1.WEAK_PASSWORD_ERR);
    }
    else {
        next();
    }
};
exports.isStrongPassword = isStrongPassword;
var isEmail = function (req, res, next) {
    var form = "auth/register";
    if (global_constants_1.EMAIL_REGEX.test(req.body.email)) {
        next();
    }
    else {
        form_utils_1.renderForm(form, req, res, global_constants_1.INVALID_EMAIL_ERR);
    }
};
exports.isEmail = isEmail;
