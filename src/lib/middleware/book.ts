// Import libraries and dependencies
import { IMiddleware } from "../form-types";
import Book, { IBook } from "../../models/book";
import { renderNewPage } from "../book-utils";

// Middleware for checking book post and put requests
export const bookFormChecker: IMiddleware = function(req, res, next) {
  const book: IBook = new Book();
  let hasEmptyField = false;
  for (let key in req.body) {
    if (!["coAuthor", "tags", "cover"].includes(key)) {
      if (req.body[key] === "" || !req.body[key]) {
       hasEmptyField = true;
      } else {
        try {
          book[key] = req.body[key];
        } catch {
          renderNewPage(req, res, book, true);
          return;
        }
      }
    }
  }
  if (!hasEmptyField) {
    next();
  } else {
    renderNewPage(req, res, book, true);
    return;
  }
}

// Middleware for checking book post and put requests
export const bookCoverChecker: IMiddleware = function(req, res, next) {
  if (req.body.cover === "" || !req.body.cover) {
    renderNewPage(req, res, new Book(), true);
    return;
  } else {
    next();
  }
}