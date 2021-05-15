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
exports.passwordsMatch = exports.isValidVerifyToken = exports.isValidResetToken = exports.isAdmin = exports.isNotAlreadyLoggedIn = exports.isAuthenticated = void 0;
var passwordReset_1 = __importDefault(require("../../models/passwordReset"));
var userVerification_1 = __importDefault(require("../../models/userVerification"));
var error_utils_1 = require("../error-utils");
// Middleware for checking user authentication
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        error_utils_1.renderError("unauth", res, false);
    }
};
exports.isAuthenticated = isAuthenticated;
var isNotAlreadyLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    else {
        next();
    }
};
exports.isNotAlreadyLoggedIn = isNotAlreadyLoggedIn;
// Middleware for checking whether user is an admin
var isAdmin = function (req, res, next) {
    var _a;
    var isAuth = req.isAuthenticated();
    if (isAuth && ((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin) === true) {
        next();
    }
    else {
        error_utils_1.renderError("unauth", res, isAuth);
    }
};
exports.isAdmin = isAdmin;
var isValidResetToken = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, passwordReset, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = req.params.token;
                    return [4 /*yield*/, passwordReset_1.default.findOne({ token: token })];
                case 1:
                    passwordReset = _b.sent();
                    if (!passwordReset) {
                        throw new Error();
                    }
                    else {
                        next();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    error_utils_1.renderError("not-found", res, req.isAuthenticated());
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.isValidResetToken = isValidResetToken;
var isValidVerifyToken = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, userVerification, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = req.params.token;
                    return [4 /*yield*/, userVerification_1.default.findOne({ token: token })];
                case 1:
                    userVerification = _b.sent();
                    if (!userVerification) {
                        throw new Error();
                    }
                    else {
                        next();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    error_utils_1.renderError("not-found", res, req.isAuthenticated());
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.isValidVerifyToken = isValidVerifyToken;
var passwordsMatch = function (req, res, next) {
    // Check if passwords match -- if yes, proceed
    var token = req.params.token;
    var _a = req.body, password = _a.password, confirm = _a.confirm;
    if (password === confirm) {
        next();
    }
    else {
        res.render("reset/reset-confirm", {
            csrfToken: req.csrfToken(),
            error: "Error: Passwords do not match.",
            token: token
        });
    }
};
exports.passwordsMatch = passwordsMatch;
