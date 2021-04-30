"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Import dependencies
var express_1 = require("express");
// Define and export router
exports.router = express_1.Router();
// @route GET /books
// @desc  Render Search Books form and related books
exports.router.get("/", function (req, res) {
    res.send("books");
});
// @route GET /books/new
// @desc  Render form for adding a new book to screen
exports.router.get("/new", function (req, res) {
    res.send("new book");
});
// @route POST /books
// @desc  Add a new book to the database
exports.router.post("/", function (req, res) {
    res.send("posting");
});
// @route GET /books/:id
// @desc  Render info for an existing book to screen
exports.router.get("/:id", function (req, res) {
    res.send("show book " + req.params.id);
});
// @route GET /books/:id/edit
// @desc  Render form for editing an existing book
exports.router.get("/:id/edit", function (req, res) {
    res.send("edit book " + req.params.id);
});
// @route PUT /books/:id
// @desc  Update an existing book entry in the database
exports.router.put("/:id", function (req, res) {
    res.send("edit book " + req.params.id);
});
// @route DELETE /books/:id
// @desc  Remove a book from the database
exports.router.delete("/:id/edit", function (req, res) {
    res.send("delete book " + req.params.id);
});
