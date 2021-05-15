// Import dependencies
import { Request, Response } from "express";
import { LeanDocument, Query } from "mongoose";
import Book, { IBook, eras, Era } from "../models/book";
import Author, { IAuthor } from "../models/author";
import { EMPTY_FORM_ERR, PAGE_ERR } from "./global-constants";
import { renderError } from "./error-utils";

// Define types & interfaces
type Form = "new" | "edit";
interface IController {
  (req: Request, res: Response, book: IBook, hasError?: boolean, form?: Form) : Promise<void>
}
interface IParams {
  authors: LeanDocument<IAuthor>[]
  book: LeanDocument<IBook>,
  eras: string[];
  isAuth: boolean,
  csrfToken: string,
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
    query.find({ publishDate: queryOptions });
  }
  // Add Lesser Than or Equal Value if provided
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    const pubBefore = new Date("" + req.query.publishedBefore);
    queryOptions.$lte = pubBefore;
    query.find({ publishDate: queryOptions });
  }
  // Add era if provided
  if (req.query.era != null && req.query.era != "") {
      const era = req.query.era as Era;
      query.find({ era: { $eq: era }});
  }
  // Add Title Search Regex if provided title
  if (req.query.title != null && req.query.title != "") {
    const title = "" + req.query.title;
    query.regex("title", new RegExp(title, "i"));
  }
  // Add Tags Search Regex if provided keywords
  if (req.query.keywords != null && req.query.keywords != "") {
    const keyword = "" + req.query.keywords;
    query.regex("tags", new RegExp(keyword, "i"));
  }
  // Return populated query
  return query;
};

export const renderFormPage: IController = async function(req, res, book, hasError = false, form) {
  // Set var to conditionally render based on auth status
  const isAuth = req.user ? true : false;
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
    if (book.tags) {
      bookJSON.tags = book.tags;
    }
    // set params
    let params: IParams = {
      authors: authors,
      book: bookJSON,
      isAuth,
      eras: eras,
      csrfToken: req.csrfToken()
    }
    // Check for errors
    if (hasError) {
      params.error = EMPTY_FORM_ERR;
    }
    // Render given form with params
    res.render(`books/${form}`, params);
  } catch {
    // *!!Replace this with a funny error view!!*
    res.render("books/index", {
      error: PAGE_ERR,
      isAuth
    });
  }
}

export const renderNewPage: IController = async function(req, res, book, hasError = false) {
  renderFormPage(req, res, book, hasError, "new");
}

export const renderEditPage: IController = async function(req, res, book, hasError = false) {
  renderFormPage(req, res, book, hasError, "edit");
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

export const saveTags = function(book: IBook, req: Request) {
  if (req.body.tags != null && req.body.tags != "") {
    book.tags = req.body.tags;
  }
}