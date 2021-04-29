// Import dependencies
import { Schema, Document, model, Model } from "mongoose";

// Define and export interface derived from mongoose Document
export interface IBook extends Document {
  title: string,
  description: string,
  pageCount: number,
  createdAt: Date,
  publishDate: Date,
  coverImage: Buffer,
  coverImageType: string,
  author: Schema.Types.ObjectId
}

// Define schema
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  publishDate: {
    type: Date,
    required: true
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  }
});

// Set virtual for coverImagePath to store base64 encoded value of the cover image
bookSchema.virtual("coverImagePath").get(function(this: IBook) {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
});

// Define and export Book model based on schema
const Book: Model<IBook> = model("Book", bookSchema);
export default Book;