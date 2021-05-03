// Import dependencies
import { Router, Request, Response, NextFunction } from "express";
import Author, { IAuthor } from "../models/author";
import Book from "../models/book";
import { LeanDocument } from "mongoose";

// Define interfaces
interface IParams {
  name?: RegExp
}

// Middleware for checking post and put requests
const emptyFormChecker = function(req: Request, res: Response, next: NextFunction) {
  if (req.body.name === "" || !req.body.name) {
    res.render("authors/new", {
      error: "Please complete all form fields"
    });
  } else {
    next();
  }
}

// Define and export router
export const router = Router();

// @route GET /authors
// @desc  Render Search Author form and books by author
router.get("/", async (req: Request, res: Response) => {
  // Set search options to regex based on req.query
  let searchOptions: IParams = {};
  if (req.query.name !== "" && req.query.name != null) {
    const name: string = "" + req.query.name;
    searchOptions.name = new RegExp(name, "i");
  }
  let authors: LeanDocument<IAuthor>[] | null = null;
  try {
    authors = await Author.find(searchOptions).lean();
    res.render("authors/index", {
      authors,
      searchOptions: req.query
    });
  } catch {
    if (authors == null) {
      res.render("authors/index", {
        searchOptions: req.query,
        error: "Could not get authors"
      });
    } else {
      res.render("/", {
        error: "Failed to load authors page"
      });
    }
  }
});

// @route GET /authors/new
// @desc  Render form for adding a new author to screen
router.get("/new", (req: Request, res: Response) => {
  res.render("authors/new", { author: new Author() });
});

// @route POST /authors
// @desc  Add a new author to the database
router.post("/", emptyFormChecker, async (req: Request, res: Response) => {
  let author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`/authors/${newAuthor._id}`);
  } catch {
    res.render("authors/new", {
      error: "Error saving new author"
    });
  }
});

// @route GET /authors/:id
// @desc  Render info for an existing author to screen
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id).lean();
    const books = await Book.find({ author: author?._id }).lean();
    res.render("authors/show", {
      author: author,
      books: books
    });
  } catch {
    res.redirect("/");
  }
});

// @route GET /authors/:id/edit
// @desc  Render form for editing name of existing author
router.get("/:id/edit", async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id).lean();
    res.render("authors/edit", {
      author
    });
  } catch {
    res.render("authors/index", { error: "Error loading edit author page"});
  }
});

// @route PUT /authors/:id
// @desc  Update an existing author entry in the database
router.put("/:id", emptyFormChecker, async (req: Request, res: Response) => {
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    if (author == null) throw "Author not found";
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${req.params.id}`);
  } catch(error) {
    if (author != null) {
      error = "Failed to update author";
    }
    res.render("authors/index", { error });
  }
});

// @route DELETE /authors/:id
// @desc  Remove an author from the database
// *Include a check to prevent deleting an author ASW books
router.delete("/:id", async (req: Request, res: Response) => {
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    if (author == null) throw "Author not found";
    await author.remove();
    res.redirect("/authors");
  } catch(error) {
    if (author != null) {
      error = "Failed to remove author";
    }
    res.render("authors/index", { error });
  }
});