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
exports.router = void 0;
// Import dependencies
var express_1 = require("express");
var passwordReset_1 = __importDefault(require("../models/passwordReset"));
var user_1 = __importDefault(require("../models/user"));
var auth_1 = require("../lib/middleware/auth");
var forms_1 = require("../lib/middleware/forms");
var password_utils_1 = require("../lib/password-utils");
var error_utils_1 = require("../lib/error-utils");
// Declare and export router
exports.router = express_1.Router();
// Define routes
// @route   GET /reset-confirm/:token
// @desc    Render form for updating password
// @access  Public
exports.router.get("/:token", auth_1.isValidResetToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        token = req.params.token;
        try {
            res.render("reset/reset-confirm", {
                token: token,
                csrfToken: req.csrfToken(),
            });
        }
        catch (_b) {
            error_utils_1.renderError("server-err", res, false);
        }
        return [2 /*return*/];
    });
}); });
// @route   POST /reset-confirm/:token
// @desc    Submit form for updating password
// @access  Public
exports.router.post("/:token", forms_1.passwordsNotEmpty, auth_1.passwordsMatch, auth_1.isValidResetToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, passwordReset, user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = req.params.token;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, passwordReset_1.default.findOne({ token: token })];
            case 2:
                passwordReset = _b.sent();
                return [4 /*yield*/, user_1.default.findOne({ _id: passwordReset === null || passwordReset === void 0 ? void 0 : passwordReset.user })];
            case 3:
                user = _b.sent();
                // Guard clause in case user is not found
                if (!user) {
                    throw "Error looking up user";
                }
                user.passwordHash = password_utils_1.generatePassword(req.body.password);
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                return [4 /*yield*/, passwordReset_1.default.deleteOne({ _id: passwordReset === null || passwordReset === void 0 ? void 0 : passwordReset._id })];
            case 5:
                _b.sent();
                res.render("auth/login", {
                    error: "Password updated",
                    csrfToken: req.csrfToken(),
                    isAuth: false
                });
                return [3 /*break*/, 7];
            case 6:
                _a = _b.sent();
                error_utils_1.renderError("server-err", res, false);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
