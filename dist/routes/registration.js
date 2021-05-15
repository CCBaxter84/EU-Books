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
// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// Import dependencies
var express_1 = require("express");
var password_utils_1 = require("../lib/password-utils");
var auth_1 = require("../lib/middleware/auth");
var forms_1 = require("../lib/middleware/forms");
var nodemailer_1 = require("../lib/nodemailer");
var user_1 = __importDefault(require("../models/user"));
var userVerification_1 = __importDefault(require("../models/userVerification"));
var error_utils_1 = require("../lib/error-utils");
// Define and export router
exports.router = express_1.Router();
// @route   GET /registration
// @desc    Submit and authenticate username and password
// @access  Public
exports.router.get("/", auth_1.isNotAlreadyLoggedIn, function (req, res) {
    res.render("auth/register", { csrfToken: req.csrfToken() });
});
// @route   POST /registration
// @desc    Submit new user to database
// @access  Public
exports.router.post("/", forms_1.regFormChecker, forms_1.isEmail, forms_1.checkForEmail, forms_1.checkForUserName, forms_1.isStrongPassword, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var passwordHash, newUser, savedUser, token, verifyLink, userToken, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                passwordHash = password_utils_1.generatePassword(req.body.password);
                newUser = new user_1.default({
                    email: req.body.email,
                    username: req.body.username,
                    passwordHash: passwordHash,
                });
                return [4 /*yield*/, newUser.save()];
            case 1:
                savedUser = _b.sent();
                token = nodemailer_1.createToken();
                verifyLink = process.env.DOMAIN + "/verify/" + token;
                userToken = new userVerification_1.default({
                    user: savedUser._id,
                    token: token
                });
                return [4 /*yield*/, userToken.save()];
            case 2:
                _b.sent();
                // Email the link to approve/deny the request
                nodemailer_1.sendEmail({
                    to: "" + process.env.EMAIL_ADDRESS,
                    subject: "New User Request",
                    text: "A new user has requested site access. Here's a link to approve or deny the request: " + verifyLink
                });
                res.render("auth/login", {
                    csrfToken: req.csrfToken(),
                    error: "Site access request sent. Please check for your email for approval notification.",
                    isAuth: false
                });
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                error_utils_1.renderError("server-err", res, false);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
