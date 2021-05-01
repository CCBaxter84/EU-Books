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

export const putURL: IHelper = function(model, isAuthor) {
  return getID(model, isAuthor) + "?_method=PUT";
};

export const postURL: IHelper = function(model, isAuthor) {
  return isAuthor ? "/authors" : "/books";
};

export const isAuthorMatch = function(author: IAuthor, book: IBook): boolean {
  try {
    return author._id === book.author;
  } catch {
    return false;
  }
}