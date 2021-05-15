// Import dependencies
import { Router, Request, Response } from "express";
import Author from "../models/author";
import Book from "../models/book";
import { isAuthenticated } from "../lib/middleware/auth";
import { authorFormChecker } from "../lib/middleware/forms";
import { DB_LOOKUP_ERR, AUTHOR_HAS_BOOKS_ERR, INVALID_AUTHOR_ERR } from "../lib/global-constants";
import { renderError } from "../lib/error-utils";

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
  try {
    const authors = await Author.find(searchOptions).lean();
    res.render("authors/index", {
      authors,
      isAuth,
      csrfToken: req.csrfToken(),
      searchOptions: req.query
    });
  } catch {
    renderError("server-err", res, isAuth);
  }
});

// @route   GET /authors/new
// @desc    Render form for adding a new author to screen
// @access  Private
router.get("/new", isAuthenticated, (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  res.render("authors/new", { author: new Author(), isAuth, csrfToken: req.csrfToken() });
});

// @route   POST /authors
// @desc    Add a new author to the database
// @access  Private
router.post("/", isAuthenticated, authorFormChecker, async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  const newAuthor = new Author({
    name: req.body.name
  });
  try {
    const savedAuthor = await newAuthor.save();
    res.redirect(`/authors/${savedAuthor._id}`);
  } catch {
    renderError("server-err", res, isAuth);
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
    if (author == null) throw DB_LOOKUP_ERR;
    const books = await Book.find({ $or: [{ author: author._id }, { coAuthor: author._id }] }).lean();
    if (books == null) throw DB_LOOKUP_ERR;
    res.render("authors/show", { author, books, isAuth, csrfToken: req.csrfToken() });
  } catch(err) {
    // Update this to render a 400 Error View
    const error = err.message === DB_LOOKUP_ERR ? "server-err" : "not-found";
    renderError(error, res, isAuth);
  }
});

// @route   GET /authors/:id/edit
// @desc    Render form for editing author name
// @access  Private
router.get("/:id/edit", isAuthenticated, async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  try {
    const author = await Author.findById(req.params.id).lean();
    res.render("authors/edit", {
      author,
      isAuth,
      csrfToken: req.csrfToken()
    });
  } catch {
    renderError("server-err", res, isAuth);
  }
});

// @route   PUT /authors/:id
// @desc    Update an existing author entry
// @access  Private
router.put("/:id", isAuthenticated, authorFormChecker, async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  try {
    let author = await Author.findById(req.params.id);
    if (author == null) throw "Author not found";
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${req.params.id}`);
  } catch(error) {
    const type = error.message === "Author not found" ? "server-err" : "not-found";
    renderError(type, res, isAuth);
  }
});

// @route   DELETE /authors/:id
// @desc    Remove an author from the database
// @access  Private
router.delete("/:id", isAuthenticated, async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  try {
    const author = await Author.findById(req.params.id);
    if (author == null) throw INVALID_AUTHOR_ERR;
    await author.remove();
    res.redirect("/authors");
  } catch(error) {
    const type = error.message !== AUTHOR_HAS_BOOKS_ERR ? "server-err" : "not-found";
    renderError(type, res, isAuth);
  }
});