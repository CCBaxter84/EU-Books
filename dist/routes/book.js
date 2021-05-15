"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var book_1 = __importStar(require("../models/book"));
var book_utils_1 = require("../lib/book-utils");
var book_2 = require("../lib/middleware/book");
var auth_1 = require("../lib/middleware/auth");
var error_utils_1 = require("../lib/error-utils");
var global_constants_1 = require("../lib/global-constants");
// Define and export router
exports.router = express_1.Router();
// Define routes
// @route   GET /books
// @desc    Render Search Books form and related books
// @access  Public
exports.router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, query, books, booksJSON, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                isAuth = req.user ? true : false;
                query = book_utils_1.queryBuilder(req);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, query.exec()];
            case 2:
                books = _b.sent();
                booksJSON = books.map(function (book) {
                    return {
                        title: book.title,
                        description: book.description,
                        pageCount: book.pageCount,
                        createdAt: book.createdAt,
                        publishDate: book.publishDate,
                        coverImage: book.coverImage,
                        coverImageType: book.coverImageType,
                        author: book.author,
                        _id: book._id
                    };
                });
                // render book index view; pass books and searchOptions to it
                res.render("books/index", {
                    books: booksJSON,
                    searchOptions: req.query,
                    eras: book_1.eras,
                    isAuth: isAuth
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
// @route   GET /books/new
// @desc    Render form for adding a new book to screen
// @access  Private
exports.router.get("/new", auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        book_utils_1.renderNewPage(req, res, new book_1.default());
        return [2 /*return*/];
    });
}); });
// @route   POST /books
// @desc    Add a new book to the database
// @access  Private
exports.router.post("/", auth_1.isAuthenticated, book_2.bookFormChecker, book_2.bookCoverChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, newBook, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                book = new book_1.default({
                    title: req.body.title,
                    description: req.body.description,
                    pageCount: req.body.pageCount,
                    publishDate: req.body.publishDate,
                    author: req.body.author,
                    era: req.body.era
                });
                book_utils_1.saveCoAuthor(book, req);
                book_utils_1.saveCover(book, req.body.cover);
                book_utils_1.saveTags(book, req);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book.save()];
            case 2:
                newBook = _b.sent();
                res.redirect("/books/" + newBook.id);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                book_utils_1.renderNewPage(req, res, book, true);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route   GET /books/:id
// @desc    Render info for an existing book to screen
// @access  Public
exports.router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coAuthor, isAuth, book, author, err_1, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coAuthor = null;
                isAuth = req.user ? true : false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, book_1.default.findById(req.params.id).lean()];
            case 2:
                book = _a.sent();
                if (book == null)
                    throw global_constants_1.DB_LOOKUP_ERR;
                return [4 /*yield*/, author_1.default.findById(book.author).lean()];
            case 3:
                author = _a.sent();
                if (author == null)
                    throw global_constants_1.DB_LOOKUP_ERR;
                if (!(book.coAuthor != null && String(book.coAuthor) != "")) return [3 /*break*/, 5];
                return [4 /*yield*/, author_1.default.findById(book.coAuthor).lean()];
            case 4:
                coAuthor = _a.sent();
                _a.label = 5;
            case 5:
                res.render("books/show", { book: book, author: author, coAuthor: coAuthor, isAuth: isAuth, csrfToken: req.csrfToken() });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                error = err_1.message === global_constants_1.DB_LOOKUP_ERR ? "server-err" : "not-found";
                error_utils_1.renderError(error, res, isAuth);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// @route   GET /books/:id/edit
// @desc    Render form for editing an existing book
// @access  Private
exports.router.get("/:id/edit", auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, book, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                isAuth = req.user ? true : false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1.default.findById(req.params.id)];
            case 2:
                book = _b.sent();
                if (book === null)
                    throw "No book found";
                book_utils_1.renderEditPage(req, res, book);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                error_utils_1.renderError("server-err", res, isAuth);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route   PUT /books/:id
// @desc    Update an existing book entry
// @access  Public
exports.router.put("/:id", auth_1.isAuthenticated, book_2.bookFormChecker, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, book, error_1, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isAuth = req.user ? true : false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, book_1.default.findById(req.params.id)];
            case 2:
                book = _a.sent();
                if (book === null)
                    throw "Book not found";
                book.title = req.body.title;
                book.author = req.body.author;
                book.publishDate = new Date(req.body.publishDate);
                book.pageCount = req.body.pageCount;
                book.description = req.body.description;
                book.era = req.body.era;
                if (req.body.cover !== null && req.body.cover !== "") {
                    book_utils_1.saveCover(book, req.body.cover);
                }
                book_utils_1.saveCoAuthor(book, req);
                book_utils_1.saveTags(book, req);
                return [4 /*yield*/, book.save()];
            case 3:
                _a.sent();
                res.redirect("/books/" + req.params.id);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                type = error_1.message === "Book not found" ? "server-err" : "not-found";
                error_utils_1.renderError(type, res, isAuth);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route   DELETE /books/:id
// @desc    Remove a book from the database
// @access  Private
exports.router.delete("/:id", auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, book, error_2, type;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isAuth = req.user ? true : false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, book_1.default.findById(req.params.id)];
            case 2:
                book = _a.sent();
                if (book === null)
                    throw "Book not found";
                return [4 /*yield*/, book.remove()];
            case 3:
                _a.sent();
                res.redirect("/books");
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                type = error_2.message === "Book not found" ? "not-found" : "server-err";
                error_utils_1.renderError(type, res, isAuth);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
