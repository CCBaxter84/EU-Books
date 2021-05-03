// Import dependencies
import { Response } from "express";
import { LeanDocument } from "mongoose";
import { IBook } from "../models/book";
import Author, { IAuthor } from "../models/author";

// Define types & interfaces
type Form = "new" | "edit";
interface IController {
  (res: Response, book: IBook, hasError?: boolean, form?: Form) : Promise<void>
}
interface IParams {
  authors: LeanDocument<IAuthor>[]
  book: LeanDocument<IBook>,
  errorMessage?: string
}
const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "images/gif"];

// Define and export controller functions
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
        params.errorMessage = "Error Updating Book";
      } else {
        params.errorMessage = "Error Creating Book";
      }
    }

    // Render given form with params
    res.render(`books/${form}`, params);
  } catch {
    res.redirect("/books");
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