// Import dependencies
import { Router, Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Author, { IAuthor } from "../models/author";
import Book, { eras } from "../models/book";
import { queryBuilder, renderEditPage, renderNewPage, saveCover, saveCoAuthor, saveTags } from "../lib/book-utils";
import { bookFormChecker, bookCoverChecker } from "../lib/middleware/book";
import { isAuthenticated } from "../lib/middleware/auth";
import { renderError } from "../lib/error-utils";
import { DB_LOOKUP_ERR } from "../lib/global-constants";

// Define and export router
export const router = Router();

// Define routes

// @route   GET /books
// @desc    Render Search Books form and related books
// @access  Public
router.get("/", async (req: Request, res: Response) => {
  // Set var to conditionally render based on auth status
  const isAuth = req.user ? true : false;
  // build DB query based off request query
  let query = queryBuilder(req);
  try {
    // get books from database based off built query
    const books = await query.exec();
    const booksJSON = books.map(book => {
      return {
        title: book.title,
        description: book.description,
        pageCount: book.pageCount,
        createdAt: book.createdAt,
        publishDate: book.publishDate,
        coverImage: book.coverImage,
        coverImageType: book.coverImageType,
        author: book.author,
        _id: book._id
      }
    });
    // render book index view; pass books and searchOptions to it
    res.render("books/index", {
      books: booksJSON,
      searchOptions: req.query,
      eras,
      isAuth
    });
  } catch {
    renderError("server-err", res, isAuth);
  }
});

// @route   GET /books/new
// @desc    Render form for adding a new book to screen
// @access  Private
router.get("/new", isAuthenticated, async (req: Request, res: Response) => {
  renderNewPage(req, res, new Book());
});

// @route   POST /books
// @desc    Add a new book to the database
// @access  Private
router.post("/", isAuthenticated, bookFormChecker, bookCoverChecker, async (req: Request, res: Response) => {
  let book = new Book({
    title: req.body.title,
    description: req.body.description,
    pageCount: req.body.pageCount,
    publishDate: req.body.publishDate,
    author: req.body.author,
    era: req.body.era
  });
  saveCoAuthor(book, req);
  saveCover(book, req.body.cover);
  saveTags(book, req);
  try {
    const newBook = await book.save();
    res.redirect(`/books/${newBook.id}`);
  } catch {
    renderNewPage(req, res, book, true);
  }
});

// @route   GET /books/:id
// @desc    Render info for an existing book to screen
// @access  Public
router.get("/:id", async (req: Request, res: Response) => {
  // Set vars to pass to views
  let coAuthor: LeanDocument<IAuthor> | null = null;
  const isAuth = req.user ? true : false;
  try {
    const book = await Book.findById(req.params.id).lean();
    if (book == null) throw DB_LOOKUP_ERR;
    const author = await Author.findById(book.author).lean();
    if (author == null) throw DB_LOOKUP_ERR;

    if (book.coAuthor != null && String(book.coAuthor) != "") {
      coAuthor = await Author.findById(book.coAuthor).lean();
    }

    res.render("books/show", { book, author, coAuthor, isAuth, csrfToken: req.csrfToken() });
  } catch(err) {
    const error = err.message === DB_LOOKUP_ERR ? "server-err" : "not-found";
    renderError(error, res, isAuth);
  }
});

// @route   GET /books/:id/edit
// @desc    Render form for editing an existing book
// @access  Private
router.get("/:id/edit", isAuthenticated, async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  try {
    const book = await Book.findById(req.params.id);
    if (book === null) throw "No book found";
    renderEditPage(req, res, book);
  } catch {
    renderError("server-err", res, isAuth);
  }
});

// @route   PUT /books/:id
// @desc    Update an existing book entry
// @access  Public
router.put("/:id", isAuthenticated, bookFormChecker, async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  try {
    let book = await Book.findById(req.params.id);
    if (book === null) throw "Book not found";
    book.title = req.body.title;
    book.author = req.body.author;
    book.publishDate = new Date(req.body.publishDate);
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    book.era = req.body.era;
    if (req.body.cover !== null && req.body.cover !== "") {
      saveCover(book, req.body.cover);
    }
    saveCoAuthor(book, req);
    saveTags(book, req);
    await book.save();
    res.redirect(`/books/${req.params.id}`);
  } catch(error) {
    const type = error.message === "Book not found" ? "server-err" : "not-found";
    renderError(type, res, isAuth);
  }
});

// @route   DELETE /books/:id
// @desc    Remove a book from the database
// @access  Private
router.delete("/:id", isAuthenticated, async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  try {
    const book = await Book.findById(req.params.id);
    if (book === null) throw "Book not found";
    await book.remove();
    res.redirect("/books");
  } catch(error) {
    const type = error.message === "Book not found" ? "not-found" : "server-err";
    renderError(type, res, isAuth);
  }
});