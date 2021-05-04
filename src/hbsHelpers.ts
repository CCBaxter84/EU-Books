// Import dependencies
import { IAuthor } from "./models/author";
import { IBook } from "./models/book";

// Interfaces
interface IHelper {
  (model: IAuthor|IBook, isAuthor: boolean): string
}

// Define and export helper functions
export const getID: IHelper = function(model, isAuthor) {
  if (isAuthor) {
    return `/authors/${model._id}`;
  } else {
    return `/books/${model._id}`;
  }
};

export const isAuthorMatch = function(author: IAuthor, bookAuthor: string): boolean {
  try {
    return author._id.toString() === bookAuthor.toString();
  } catch {
    return false;
  }
};

export const isEraMatch = function(era: string, bookEra: string) {
  try {
    return era === bookEra;
  } catch {
    return false;
  }
}

export const getCoverPath = function(book: IBook): string|void {
  if (book.coverImage != null && book.coverImageType != null) {
    return `data:${book.coverImageType};charset=utf-8;base64,${book.coverImage.toString('base64')}`
  }
};

export const getDateString = function(date: Date): string {
  console.log(date.toISOString().split("T")[0]);
  return date.toDateString();
}

export const getPubDate = function(date: Date): string {
  return date == null ? "" : date.toISOString().split("T")[0];
}

export const formatDescription = function(description: string): string[] {
  return description.split("\r\n");
}