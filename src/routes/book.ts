// Import dependencies
import { Router, Request, Response } from "express";
import Author from "../models/author";
import Book from "../models/book";
import { renderFormPage, renderEditPage, renderNewPage, saveCover } from "./bookControllers";

// Define and export router
export const router = Router();

// @route GET /books
// @desc  Render Search Books form and related books
router.get("/", async (req: Request, res: Response) => {
  // build DB query based off request query
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    const title = "" + req.query.title;
    query.regex("title", new RegExp(title, "i"));
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    const pubAfter = parseInt("" + req.query.publishedAfter);
    query.lte("publishDate", pubAfter);
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    const pubBefore = parseInt("" + req.query.publishedBefore);
    query.gte("publishDate", pubBefore);
  }

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
  } catch{
    res.redirect("/");
  }
});

// @route GET /books/new
// @desc  Render form for adding a new book to screen
router.get("/new", async (req: Request, res: Response) => {
  renderNewPage(res, new Book());
});

// @route POST /books
// @desc  Add a new book to the database
router.post("/", async (req: Request, res: Response) => {
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
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) throw "Book not found";
    const author = await Author.findById(book.author);
    if (author == null) throw "Orphaned books";
    console.log(author);
    res.render("books/show", { book });
  } catch(err) {
    console.log(err)
    res.redirect("/");
  }
});

// @route GET /books/:id/edit
// @desc  Render form for editing an existing book
router.get("/:id/edit", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book === null) throw "No book found";
    renderEditPage(res, book);
  } catch {
    res.redirect("/");
  }
});

// @route PUT /books/:id
// @desc  Update an existing book entry in the database
router.put("/:id", (req: Request, res: Response) => {
  res.send("edit book " + req.params.id);
});

// @route DELETE /books/:id
// @desc  Remove a book from the database
router.delete("/:id/edit", async (req: Request, res: Response) => {
  let book = null;
  try {
    book = await Book.findById(req.params.id);
    await book?.remove();
    res.redirect("/books");
  } catch {
    if (book != null) {
      res.render("books/show", {
        book
      })
    }
    res.redirect("/");
  }
});