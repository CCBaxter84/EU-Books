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
var userVerification_1 = __importDefault(require("../models/userVerification"));
var user_1 = __importDefault(require("../models/user"));
var auth_1 = require("../lib/middleware/auth");
var nodemailer_1 = require("../lib/nodemailer");
// Declare and export router
exports.router = express_1.Router();
// Define routes
// @route   GET /verify/:token
// @desc    Render form for verifying user
// @access  Public
exports.router.get("/:token", auth_1.isValidVerifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, errorMsg, userToken, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.params.token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                errorMsg = "Error fetching user";
                return [4 /*yield*/, userVerification_1.default.findOne({ token: token })];
            case 2:
                userToken = _a.sent();
                if (!userToken) {
                    throw errorMsg;
                }
                return [4 /*yield*/, user_1.default.findById(userToken.user).lean()];
            case 3:
                user = _a.sent();
                if (!user) {
                    throw errorMsg;
                }
                // Render verify template to view & pass it the user and token info
                res.render("auth/verify", {
                    user: user,
                    token: token,
                    csrfToken: req.csrfToken(),
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.send(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route   POST /verify/:token
// @desc    Submit form for verifying the new user
// @access  Public
exports.router.post("/:token", auth_1.isValidVerifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, errorMsg, tokenDoc, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.params.token;
                errorMsg = "Error approving user account request";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, userVerification_1.default.findOne({ token: token })];
            case 2:
                tokenDoc = _a.sent();
                if (!tokenDoc) {
                    throw errorMsg;
                }
                return [4 /*yield*/, user_1.default.findById(tokenDoc.user)];
            case 3:
                user = _a.sent();
                if (!user) {
                    throw errorMsg;
                }
                // Update user's locked and verified fields
                user.locked = false;
                user.verified = true;
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                // Delete the token w/o using .remove() to avoid also deleting the user
                return [4 /*yield*/, userVerification_1.default.findByIdAndDelete(tokenDoc._id)];
            case 5:
                // Delete the token w/o using .remove() to avoid also deleting the user
                _a.sent();
                // Send notification email to approved user
                nodemailer_1.sendEmail({
                    to: user.email,
                    subject: "New User Request",
                    text: "The site admin has approved your request for an account. You can now log in at the following link: " + process.env.DOMAIN + "/login"
                });
                // Redirect to main page
                res.redirect("/");
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                res.send(error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// @route   DELETE /verify/:token
// @desc    Submit form for verifying the new user
// @access  Public
exports.router.delete("/:token", auth_1.isValidVerifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, errorMsg, tokenDoc, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.params.token;
                errorMsg = "Error Denying user account request";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userVerification_1.default.findOne({ token: token })];
            case 2:
                tokenDoc = _a.sent();
                if (!tokenDoc) {
                    throw errorMsg;
                }
                return [4 /*yield*/, user_1.default.findById(tokenDoc.user)];
            case 3:
                user = _a.sent();
                if (!user) {
                    throw errorMsg;
                }
                // Delete token DB document
                return [4 /*yield*/, tokenDoc.remove()];
            case 4:
                // Delete token DB document
                _a.sent();
                // Send notification email to user ASW token
                nodemailer_1.sendEmail({
                    to: user.email,
                    subject: "New User Request",
                    text: "The site admin has denied your request for a user account."
                });
                res.redirect("/");
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                res.send(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
