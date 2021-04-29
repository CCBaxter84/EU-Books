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
authorSchema.pre("remove", async function(this: IAuthor, next) {
  try {
    const books = await Book.find({ author: this.id });
    if (books.length > 1) {
      next(new Error("This Author still has stored books"));
    }
  } catch(error) {
    next(error);
  }
});

// Define and export Author model
const Author: Model<IAuthor> = model("Author", authorSchema);
export default Author;