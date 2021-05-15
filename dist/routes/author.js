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
var author_1 = __importDefault(require("../models/author"));
var book_1 = __importDefault(require("../models/book"));
var auth_1 = require("../lib/middleware/auth");
var forms_1 = require("../lib/middleware/forms");
var global_constants_1 = require("../lib/global-constants");
var error_utils_1 = require("../lib/error-utils");
// Define and export router
exports.router = express_1.Router();
// Define routes
// @route   GET /authors
// @desc    Render Search Author form and books by author
// @access  Public
exports.router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchOptions, name_1, isAuth, authors, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                searchOptions = {};
                if (req.query.name !== "" && req.query.name != null) {
                    name_1 = "" + req.query.name;
                    searchOptions.name = new RegExp(name_1, "i");
                }
                isAuth = req.user ? true : false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, author_1.default.find(searchOptions).lean()];
            case 2:
                authors = _b.sent();
                res.render("authors/index", {
                    authors: authors,
                    isAuth: isAuth,
                    csrfToken: req.csrfToken(),
                    searchOptions: req.query
                });
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                error_utils_1.renderError("server-err", res, isAuth);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route   GET /authors/new
// @desc    Render form for adding a new author to screen
// @access  Private
exports.router.get("/new", auth_1.isAuthenticated, function (req, res) {
    var isAuth = req.user ? true : false;
    res.render("authors/new", { author: new author_1.default(), isAuth: isAuth, csrfToken: req.csrfToken() });
});
// @route   POST /authors
// @desc    Add a new author to the database
// @access  Private
exports.router.post("/", auth_1.isAuthenticated, forms_1.authorFormChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, newAuthor, savedAuthor, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                isAuth = req.user ? true : false;
                newAuthor = new author_1.default({
                    name: req.body.name
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newAuthor.save()];
            case 2:
                savedAuthor = _b.sent();
                res.redirect("/authors/" + savedAuthor._id);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                error_utils_1.renderError("server-err", res, isAuth);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route   GET /authors/:id
// @desc    Render info for an existing author to screen
// @access  Public
exports.router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, author, books, err_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isAuth = req.user ? true : false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, author_1.default.findById(req.params.id).lean()];
            case 2:
                author = _a.sent();
                if (author == null)
                    throw global_constants_1.DB_LOOKUP_ERR;
                return [4 /*yield*/, book_1.default.find({ $or: [{ author: author._id }, { coAuthor: author._id }] }).lean()];
            case 3:
                books = _a.sent();
                if (books == null)
                    throw global_constants_1.DB_LOOKUP_ERR;
                res.render("authors/show", { author: author, books: books, isAuth: isAuth, csrfToken: req.csrfToken() });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                error = err_1.message === global_constants_1.DB_LOOKUP_ERR ? "server-err" : "not-found";
                error_utils_1.renderError(error, res, isAuth);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route   GET /authors/:id/edit
// @desc    Render form for editing author name
// @access  Private
exports.router.get("/:id/edit", auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, author, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                isAuth = req.user ? true : false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, author_1.default.findById(req.params.id).lean()];
            case 2:
                author = _b.sent();
                res.render("authors/edit", {
                    author: author,
                    isAuth: isAuth,
                    csrfToken: req.csrfToken()
                });
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                error_utils_1.renderError("server-err", res, isAuth);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route   PUT /authors/:id
// @desc    Update an existing author entry
// @access  Private
exports.router.put("/:id", auth_1.isAuthenticated, forms_1.authorFormChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, author, error_1, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isAuth = req.user ? true : false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, author_1.default.findById(req.params.id)];
            case 2:
                author = _a.sent();
                if (author == null)
                    throw "Author not found";
                author.name = req.body.name;
                return [4 /*yield*/, author.save()];
            case 3:
                _a.sent();
                res.redirect("/authors/" + req.params.id);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                type = error_1.message === "Author not found" ? "server-err" : "not-found";
                error_utils_1.renderError(type, res, isAuth);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route   DELETE /authors/:id
// @desc    Remove an author from the database
// @access  Private
exports.router.delete("/:id", auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, author, error_2, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isAuth = req.user ? true : false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, author_1.default.findById(req.params.id)];
            case 2:
                author = _a.sent();
                if (author == null)
                    throw global_constants_1.INVALID_AUTHOR_ERR;
                return [4 /*yield*/, author.remove()];
            case 3:
                _a.sent();
                res.redirect("/authors");
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                type = error_2.message !== global_constants_1.AUTHOR_HAS_BOOKS_ERR ? "server-err" : "not-found";
                error_utils_1.renderError(type, res, isAuth);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
