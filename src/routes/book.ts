// Import dependencies
import { Router, Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Author, { IAuthor } from "../models/author";
import Book, {IBook } from "../models/book";
import { queryBuilder, renderEditPage, renderNewPage, saveCover, emptyFormChecker } from "./bookControllers";

// Define and export router
export const router = Router();

// @route GET /books
// @desc  Render Search Books form and related books
router.get("/", async (req: Request, res: Response) => {
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
      searchOptions: req.query
    });
  } catch {
    res.render("main", { error: "Failed to load books page" });
  }
});

// @route GET /books/new
// @desc  Render form for adding a new book to screen
router.get("/new", async (req: Request, res: Response) => {
  renderNewPage(res, new Book());
});

// @route POST /books
// @desc  Add a new book to the database
router.post("/", emptyFormChecker, async (req: Request, res: Response) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    pageCount: req.body.pageCount,
    publishDate: req.body.publishDate,
    author: req.body.author
  });
  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    res.redirect(`/books/${newBook.id}`);
  } catch {
    renderNewPage(res, book, true);
  }
});

// @route GET /books/:id
// @desc  Render info for an existing book to screen
router.get("/:id", async (req: Request, res: Response) => {
  let book: LeanDocument<IBook> | null = null;
  let author: LeanDocument<IAuthor> | null = null;

  try {
    book = await Book.findById(req.params.id).lean();
    if (book == null) throw "Error looking up book";
    author = await Author.findById(book.author).lean();
    if (author == null) throw "Error looking up author";
    res.render("books/show", { book, author });
  } catch(error) {
    if (book != null || author != null) {
      error = "Could not load page"
    }
    res.render("books/index", { error });
  }
});

// @route GET /books/:id/edit
// @desc  Render form for editing an existing book
router.get("/:id/edit", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book === null) throw "No book found";
    renderEditPage(res, book);
  } catch(error) {
    res.render("main", { error });
  }
});

// @route PUT /books/:id
// @desc  Update an existing book entry in the database
router.put("/:id", emptyFormChecker, async (req: Request, res: Response) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) throw "Book not found";
    book.title = req.body.title;
    book.author = req.body.author;
    book.publishDate = new Date(req.body.publishDate);
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(book, req.body.cover);
    }
    await book.save();
    res.redirect(`/books/${req.params.id}`);
  } catch(error) {
    if (book != null) {
      renderEditPage(res, book, true);
    } else {
      res.render("books/index", { error });
    }
  }
});

// @route DELETE /books/:id
// @desc  Remove a book from the database
router.delete("/:id", async (req: Request, res: Response) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) throw "Book not found";
    await book.remove();
    res.redirect("/books");
  } catch(error) {
    if (book != null) {
      res.render("books/show", {
        book,
        error: "Failed to remove book"
      });
    }
    res.render("main", { error });
  }
});