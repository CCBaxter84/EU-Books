// Import dependencies
import { Router, Request, Response } from "express";
import Book, { IBook } from "../models/book";

// Define and export router
export const router = Router();

// @route GET /
// @desc  Render main page to the screen
router.get("/", async (req: Request, res: Response) => {
  let books: IBook[]|[];
  try {
    books = await Book.find()
                      .sort({ createdAt: "desc" })
                      .limit(10)
                      .lean();
  } catch {
    books = [];
  }
  res.render("main", { books, large: true });
});