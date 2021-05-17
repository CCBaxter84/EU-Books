"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTags = exports.formatDescription = exports.getPubDate = exports.getDateString = exports.getCoverPath = exports.isEraMatch = exports.isAuthorMatch = exports.getTokenURL = exports.getURL = void 0;
// Define and export helper functions
var getURL = function (model, isAuthor) {
    if (isAuthor) {
        return "/authors/" + model._id;
    }
    else {
        return "/books/" + model._id;
    }
};
exports.getURL = getURL;
var getTokenURL = function (token) {
    return "/verify/" + token;
};
exports.getTokenURL = getTokenURL;
var isAuthorMatch = function (author, bookAuthor) {
    try {
        return author._id.toString() === bookAuthor.toString();
    }
    catch (_a) {
        return false;
    }
};
exports.isAuthorMatch = isAuthorMatch;
var isEraMatch = function (era, bookEra) {
    try {
        return era === bookEra;
    }
    catch (_a) {
        return false;
    }
};
exports.isEraMatch = isEraMatch;
var getCoverPath = function (book) {
    if (book.coverImage != null && book.coverImageType != null) {
        return "data:" + book.coverImageType + ";charset=utf-8;base64," + book.coverImage.toString('base64');
    }
};
exports.getCoverPath = getCoverPath;
var months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
};
var getDateString = function (date) {
    var dateArr = date.toISOString().split("T")[0].split("-");
    return months[dateArr[1]] + " " + Number(dateArr[2]) + ", " + dateArr[0];
};
exports.getDateString = getDateString;
var getPubDate = function (date) {
    return date === null ? "" : date.toISOString().split("T")[0];
};
exports.getPubDate = getPubDate;
var formatDescription = function (description) {
    return description.split("\r\n");
};
exports.formatDescription = formatDescription;
var formatTags = function (tags) {
    return tags ? tags : "";
};
exports.formatTags = formatTags;
