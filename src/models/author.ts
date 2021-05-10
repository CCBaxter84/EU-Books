// Import dependencies
import { Schema, Document, model, Model } from "mongoose";
import Book from "./book";

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
      next(new Error("This author still has stored books"));
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
    } else if (author) {
      next(new Error("Author already exists"));
    } else {
      next();
    }
  })
});

// Define and export Author model
const Author: Model<IAuthor> = model("Author", authorSchema);
export default Author;