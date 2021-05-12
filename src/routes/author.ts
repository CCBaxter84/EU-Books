// Import dependencies
import { Router, Request, Response } from "express";
import Author, { IAuthor } from "../models/author";
import Book from "../models/book";
import { LeanDocument } from "mongoose";
import { isAuthenticated, authorFormChecker } from "../lib/middleware";

// Define interfaces
interface IParams {
  name?: RegExp
}

// Define and export router
export const router = Router();

// Define routes

// @route   GET /authors
// @desc    Render Search Author form and books by author
// @access  Public
router.get("/", async (req: Request, res: Response) => {
  // Set search options to regex based on req.query
  let searchOptions: IParams = {};
  if (req.query.name !== "" && req.query.name != null) {
    const name: string = "" + req.query.name;
    searchOptions.name = new RegExp(name, "i");
  }
  // Set var to conditionally render based on auth status
  const isAuth = req.user ? true : false;
  // Initialize authors var to pass to view
  let authors: LeanDocument<IAuthor>[] | null = null;
  try {
    authors = await Author.find(searchOptions).lean();
    res.render("authors/index", {
      authors,
      isAuth,
      csrfToken: req.csrfToken(),
      searchOptions: req.query
    });
  } catch {
    if (authors == null) {
      res.render("authors/index", {
        searchOptions: req.query,
        isAuth,
        error: "Could not get authors"
      });
    } else {
      res.render("/", {
        isAuth,
        error: "Failed to load authors page"
      });
    }
  }
});

// @route   GET /authors/new
// @desc    Render form for adding a new author to screen
// @access  Private
router.get("/new", isAuthenticated, (req: Request, res: Response) => {
  res.render("authors/new", { author: new Author(), isAuth: true, csrfToken: req.csrfToken() });
});

// @route   POST /authors
// @desc    Add a new author to the database
// @access  Private
router.post("/", isAuthenticated, authorFormChecker, async (req: Request, res: Response) => {
  let author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`/authors/${newAuthor._id}`);
  } catch(error) {
    if (error.message != "Author already exists") {
      error = "Error saving new author";
    }
    res.render("authors/new", {
      error,
      isAuth: true
    });
  }
});

// @route   GET /authors/:id
// @desc    Render info for an existing author to screen
// @access  Public
router.get("/:id", async (req: Request, res: Response) => {
  // Set var to conditionally render based on auth status
  const isAuth = req.user ? true : false;
  try {
    const author = await Author.findById(req.params.id).lean();
    if (author == null) throw "Error looking up author";
    const books = await Book.find({ $or: [{ author: author._id }, { coAuthor: author._id }] }).lean();
    if (books == null) throw "Error looking up books";
    res.render("authors/show", { author, books, isAuth, csrfToken: req.csrfToken() });
  } catch(error) {
    res.render("authors/index", { error, isAuth });
  }
});

// @route   GET /authors/:id/edit
// @desc    Render form for editing author name
// @access  Private
router.get("/:id/edit", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id).lean();
    res.render("authors/edit", {
      author,
      isAuth: true,
      csrfToken: req.csrfToken()
    });
  } catch {
    res.render("authors/index", { error: "Error loading edit author page", isAuth: true });
  }
});

// @route   PUT /authors/:id
// @desc    Update an existing author entry
// @access  Private
router.put("/:id", isAuthenticated, authorFormChecker, async (req: Request, res: Response) => {
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
    res.render("authors/index", { error, isAuth: true });
  }
});

// @route   DELETE /authors/:id
// @desc    Remove an author from the database
// @access  Private
router.delete("/:id", isAuthenticated, async (req: Request, res: Response) => {
  let author: IAuthor|null = null;
  try {
    author = await Author.findById(req.params.id);
    if (author == null) throw "Author not found";
    await author.remove();
    res.redirect("/authors");
  } catch(error) {
    if (error.message != "This author still has stored books") {
      error = "Failed to remove author";
    }
    res.render("authors/index", { error, isAuth: true });
  }
});