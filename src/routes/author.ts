// Import dependencies
import { Router, Request, Response } from "express";
import Author from "../models/author";
import Book from "../models/book";

// Define and export router
export const router = Router();

// @route GET /authors
// @desc  Render Search Author form and books by author
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const authors = await Author.find().lean();
    res.render("authors/index", {
      authors
    });
  } catch {
    res.redirect("/");
  }
});

// @route GET /authors/new
// @desc  Render form for adding a new author to screen
router.get("/new", (req: Request, res: Response) => {
  res.send("new author");
});

// @route POST /authors
// @desc  Add a new author to the database
router.post("/", (req: Request, res: Response) => {
  res.send("posting");
});

// @route GET /authors/:id
// @desc  Render info for an existing author to screen
router.get("/:id", (req: Request, res: Response) => {
  res.send("show author " + req.params.id);
});

// @route GET /authors/:id/edit
// @desc  Render form for editing name of existing author
router.get("/:id/edit", (req: Request, res: Response) => {
  res.send("edit author " + req.params.id);
});

// @route PUT /authors/:id
// @desc  Update an existing author entry in the database
router.put("/:id", (req: Request, res: Response) => {
  res.send("edit author" + req.params.id);
});

// @route DELETE /authors/:id
// @desc  Remove an author from the database
// *Include a check to prevent deleting an author ASW books
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    console.log(req.params.id)
    res.send("delete author" + req.params.id);
  } catch(err) {
    res.send(err);
  }
});