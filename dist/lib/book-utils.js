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
exports.saveTags = exports.saveCoAuthor = exports.saveCover = exports.renderEditPage = exports.renderNewPage = exports.renderFormPage = exports.queryBuilder = void 0;
var book_1 = __importStar(require("../models/book"));
var author_1 = __importDefault(require("../models/author"));
var global_constants_1 = require("./global-constants");
var error_utils_1 = require("./error-utils");
var imageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "images/gif"];
// Book Controller Helper Functions
var queryBuilder = function (req) {
    // Set blank query
    var query = book_1.default.find();
    var queryOptions = {};
    // Add Greater Than or Equal Value if provided
    if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
        var pubAfter = new Date("" + req.query.publishedAfter);
        queryOptions.$gte = pubAfter;
        query.find({ publishDate: queryOptions });
    }
    // Add Lesser Than or Equal Value if provided
    if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
        var pubBefore = new Date("" + req.query.publishedBefore);
        queryOptions.$lte = pubBefore;
        query.find({ publishDate: queryOptions });
    }
    // Add era if provided
    if (req.query.era != null && req.query.era != "") {
        var era = req.query.era;
        query.find({ era: { $eq: era } });
    }
    // Add Title Search Regex if provided title
    if (req.query.title != null && req.query.title != "") {
        var title = "" + req.query.title;
        query.regex("title", new RegExp(title, "i"));
    }
    // Add Tags Search Regex if provided keywords
    if (req.query.keywords != null && req.query.keywords != "") {
        var keyword = "" + req.query.keywords;
        query.regex("tags", new RegExp(keyword, "i"));
    }
    // Return populated query
    return query;
};
exports.queryBuilder = queryBuilder;
var renderFormPage = function (req, res, book, hasError, form) {
    if (hasError === void 0) { hasError = false; }
    return __awaiter(this, void 0, void 0, function () {
        var isAuth, authors, bookJSON, params, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isAuth = req.user ? true : false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, author_1.default.find().lean()];
                case 2:
                    authors = _b.sent();
                    bookJSON = {
                        _id: book._id,
                        title: book.title,
                        description: book.description,
                        pageCount: book.pageCount,
                        publishDate: book.publishDate,
                        coverImage: book.coverImage,
                        coverImageType: book.coverImageType,
                        createdAt: book.createdAt,
                        author: book.author
                    };
                    if (book.coAuthor) {
                        bookJSON.coAuthor = book.coAuthor;
                    }
                    if (book.era) {
                        bookJSON.era = book.era;
                    }
                    if (book.tags) {
                        bookJSON.tags = book.tags;
                    }
                    params = {
                        authors: authors,
                        book: bookJSON,
                        isAuth: isAuth,
                        eras: book_1.eras,
                        csrfToken: req.csrfToken()
                    };
                    // Check for errors
                    if (hasError) {
                        params.error = global_constants_1.EMPTY_FORM_ERR;
                    }
                    // Render given form with params
                    res.render("books/" + form, params);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    error_utils_1.renderError("server-err", res, isAuth);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.renderFormPage = renderFormPage;
var renderNewPage = function (req, res, book, hasError) {
    if (hasError === void 0) { hasError = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.renderFormPage(req, res, book, hasError, "new");
            return [2 /*return*/];
        });
    });
};
exports.renderNewPage = renderNewPage;
var renderEditPage = function (req, res, book, hasError) {
    if (hasError === void 0) { hasError = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.renderFormPage(req, res, book, hasError, "edit");
            return [2 /*return*/];
        });
    });
};
exports.renderEditPage = renderEditPage;
var saveCover = function (book, coverEncoded) {
    // Guard clause for empty cover
    if (coverEncoded == null)
        return;
    var cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = Buffer.from(cover.data, "base64");
        book.coverImageType = cover.type;
    }
};
exports.saveCover = saveCover;
var saveCoAuthor = function (book, req) {
    if (req.body.coAuthor != null && req.body.coAuthor != "") {
        book.coAuthor = req.body.coAuthor;
    }
};
exports.saveCoAuthor = saveCoAuthor;
var saveTags = function (book, req) {
    if (req.body.tags != null && req.body.tags != "") {
        book.tags = req.body.tags;
    }
};
exports.saveTags = saveTags;
