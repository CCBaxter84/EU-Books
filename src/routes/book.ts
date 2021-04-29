// Import dependencies
import { Router, Request, Response } from "express";

// Define and export router
export const router = Router();

// @route GET /books
// @desc  Render Search Books form and related books
router.get("/", (req: Request, res: Response) => {
  res.send("books");
});

// @route GET /books/new
// @desc  Render form for adding a new book to screen
router.get("/new", (req: Request, res: Response) => {
  res.send("new book");
});

// @route POST /books
// @desc  Add a new book to the database
router.post("/", (req: Request, res: Response) => {
  res.send("posting");
});

// @route GET /books/:id
// @desc  Render info for an existing book to screen
router.get("/:id", (req: Request, res: Response) => {
  res.send("show book " + req.params.id);
});

// @route GET /books/:id/edit
// @desc  Render form for editing an existing book
router.get("/:id/edit", (req: Request, res: Response) => {
  res.send("edit book " + req.params.id);
});

// @route PUT /books/:id
// @desc  Update an existing book entry in the database
router.put("/:id", (req: Request, res: Response) => {
  res.send("edit book " + req.params.id);
});

// @route DELETE /books/:id
// @desc  Remove a book from the database
router.delete("/:id/edit", (req: Request, res: Response) => {
  res.send("delete book " + req.params.id);
});