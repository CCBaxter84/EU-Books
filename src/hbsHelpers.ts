// Import dependencies
import { IAuthor } from "./models/author";
import { IBook } from "./models/book";

// Define and export helper functions
export const getID = function(model: IAuthor|IBook, isAuthor: boolean): string {
  if (isAuthor) {
    return `/authors/${model._id}`;
  } else {
    return `/books/${model._id}`;
  }
};

export const putURL = function(model: IAuthor|IBook, isAuthor: boolean) {
  return getID(model, isAuthor) + "?_method=PUT";
};

export const postURL = function(model: IAuthor|IBook, isAuthor: boolean) {
  return isAuthor ? "/authors" : "/books";
};