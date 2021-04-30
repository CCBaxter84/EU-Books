"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Import dependencies
var express_1 = require("express");
// Define and export router
exports.router = express_1.Router();
// @route GET /authors
// @desc  Render Search Author form and books by author
exports.router.get("/", function (req, res) {
    res.send("authors");
});
// @route GET /authors/new
// @desc  Render form for adding a new author to screen
exports.router.get("/new", function (req, res) {
    res.send("new author");
});
// @route POST /authors
// @desc  Add a new author to the database
exports.router.post("/", function (req, res) {
    res.send("posting");
});
// @route GET /authors/:id
// @desc  Render info for an existing author to screen
exports.router.get("/:id", function (req, res) {
    res.send("show author " + req.params.id);
});
// @route GET /authors/:id/edit
// @desc  Render form for editing name of existing author
exports.router.get("/:id/edit", function (req, res) {
    res.send("edit author " + req.params.id);
});
// @route PUT /authors/:id
// @desc  Update an existing author entry in the database
exports.router.put("/:id", function (req, res) {
    res.send("edit author" + req.params.id);
});
// @route DELETE /authors/:id
// @desc  Remove an author from the database
// *Include a check to prevent deleting an author ASW books
exports.router.delete("/:id/edit", function (req, res) {
    res.send("delete author" + req.params.id);
});
