// Import dependencies
import { Schema, Document, model, Model } from "mongoose";
import Book from "./book";
import { AUTHOR_EXISTS_ERR, AUTHOR_HAS_BOOKS_ERR } from "../lib/global-constants";

// Define and export interface
export interface IAuthor extends Document {
  name: string
}

// Define schema
const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// Add check to prevent deleting an author associated with books stored in the database
authorSchema.pre("remove", function(this: IAuthor, next) {
  Book.find({ author: this._id}, (error, books) => {
    if (error) {
      next(error);
    } else if (books.length > 0) {
      next(new Error(AUTHOR_HAS_BOOKS_ERR));
    } else {
      next();
    }
  });
});

// Add check to prevent saving duplicate author entries
authorSchema.pre("save", function(this: IAuthor, next) {
  Author.find({ name: this.name }, (error, author) => {
    if (error) {
      next(error);
    } else if (author.length >= 1) {
      next(new Error(AUTHOR_EXISTS_ERR));
    } else {
      next();
    }
  });
});

// Define and export Author model
const Author: Model<IAuthor> = model("Author", authorSchema);
export default Author;