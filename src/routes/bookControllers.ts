// Import dependencies
import { Request, Response } from "express";
import { LeanDocument, Query } from "mongoose";
import Book, { IBook } from "../models/book";
import Author, { IAuthor } from "../models/author";

// Define types & interfaces
type Form = "new" | "edit";
interface IController {
  (res: Response, book: IBook, hasError?: boolean, form?: Form) : Promise<void>
}
interface IParams {
  authors: LeanDocument<IAuthor>[]
  book: LeanDocument<IBook>,
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
    const bookJSON = {
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
    // set params
    let params: IParams = {
      authors: authors,
      book: bookJSON
    }
    // Check for errors
    if (hasError) {
      if (form === "edit") {
        params.error = "Error Updating Book";
      } else {
        params.error = "Error Creating Book";
      }
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
  console.log(book);
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