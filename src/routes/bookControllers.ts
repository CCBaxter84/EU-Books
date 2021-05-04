// Import dependencies
import { Request, Response, NextFunction } from "express";
import { LeanDocument, Query } from "mongoose";
import Book, { IBook, eras } from "../models/book";
import Author, { IAuthor } from "../models/author";

// Define types & interfaces
type Form = "new" | "edit";
interface IController {
  (res: Response, book: IBook, hasError?: boolean, form?: Form) : Promise<void>
}
interface IParams {
  authors: LeanDocument<IAuthor>[]
  book: LeanDocument<IBook>,
  eras: string[];
  error?: string
}

interface IQuery {
  $gte?: Date,
  $lte?: Date
}
const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "images/gif"];

// Book Controller Helper Functions
export const queryBuilder = function(req: Request): Query<IBook[], IBook, {}> {
  // Set blank query
  let query = Book.find();
  let queryOptions: IQuery = {};
  // Add Greater Than or Equal Value if provided
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    const pubAfter = new Date("" + req.query.publishedAfter);
    queryOptions.$gte = pubAfter;
    query = Book.find({ publishDate: queryOptions });
  }
  // Add Lesser Than or Equal Value if provided
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    const pubBefore = new Date("" + req.query.publishedBefore);
    queryOptions.$lte = pubBefore;
    query = Book.find({ publishDate: queryOptions });
  }
  // Add Title Search Regex if provided title
  if (req.query.title != null && req.query.title != "") {
    const title = "" + req.query.title;
    query.regex("title", new RegExp(title, "i"));
  }
  // Return populated query
  return query;
};

export const renderFormPage: IController = async function(res, book, hasError = false, form) {
  try {
    // Get all authors from database
    const authors = await Author.find().lean();
    const bookJSON: LeanDocument<IBook> = {
      _id: book._id,
      title: book.title,
      description: book.description,
      pageCount: book.pageCount,
      publishDate: book.publishDate,
      coverImage: book.coverImage,
      coverImageType: book.coverImageType,
      createdAt: book.createdAt,
      author: book.author
    };
    if (book.coAuthor) {
      bookJSON.coAuthor = book.coAuthor
    }
    if (book.era) {
      bookJSON.era = book.era;
    }
    // set params
    let params: IParams = {
      authors: authors,
      book: bookJSON,
      eras: eras
    }
    // Check for errors
    if (hasError) {
      params.error = "Error -- please ensure all fields are completed";
    }
    // Render given form with params
    res.render(`books/${form}`, params);
  } catch {
    res.render("books/index", {
      error: "Error loading page"
    });
  }
}

export const renderNewPage: IController = async function(res, book, hasError = false) {
  renderFormPage(res, book, hasError, "new");
}

export const renderEditPage: IController = async function(res, book, hasError = false) {
  renderFormPage(res, book, hasError, "edit");
}

export const saveCover = function(book: IBook, coverEncoded: string): void {
  // Guard clause for empty cover
  if (coverEncoded == null) return;

  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
};

export const saveCoAuthor = function(book: IBook, req: Request): void {
  if (req.body.coAuthor != null && req.body.coAuthor != "") {
    book.coAuthor = req.body.coAuthor;
  }
};

// Middleware for checking post and put requests
export const emptyFormChecker = function(req: Request, res: Response, next: NextFunction) {
  for (let key in req.body) {
    if (key !== "coAuthor") {
      if (req.body[key] === "" || !req.body[key]) {
        renderNewPage(res, new Book(), true);
        return;
      }
    }
  }
  next();
}