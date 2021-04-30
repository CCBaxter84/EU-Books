// Import dependencies
import { Router, Request, Response } from "express";
import Author, { IAuthor } from "../models/author";
import Book from "../models/book";

// Define interfaces
interface IParams {
  name?: RegExp
}

// Define and export router
export const router = Router();

// @route GET /authors
// @desc  Render Search Author form and books by author
router.get("/", async (req: Request, res: Response) => {
  // Set search options to regex based on req.query
  let searchOptions: IParams = {};
  if (req.query.name !== "" && req.query.name != null) {
    const name = "" + req.query.name;
    searchOptions.name = new RegExp(name, "i");
  }

  try {
    const authors = await Author.find(searchOptions).lean();
    res.render("authors/index", {
      authors,
      searchOptions: req.query
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
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    await author?.remove();
    res.redirect("/authors");
  } catch {
    if (author === null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});