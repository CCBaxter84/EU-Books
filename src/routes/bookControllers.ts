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
  book: IBook,
  errorMessage?: string
}

// Define and export controller functions
export const renderFormPage: IController = async function(res, book, hasError = false, form) {
  try {
    // Get all authors from database
    const authors = await Author.find().lean();
    // set params
    let params: IParams = {
      authors: authors,
      book: book
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
  renderFormPage(res, book, hasError, "edit");
}