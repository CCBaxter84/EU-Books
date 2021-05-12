// Import dependencies
import { Router, Request, Response } from "express";
import Book, { IBook } from "../models/book";
import { isAuthenticated } from "../lib/middleware/auth";

// Define and export router
export const router = Router();

// @route    GET /
// @desc     Render main page to the screen
// @access   Public
router.get("/", async (req: Request, res: Response) => {
  let books: IBook[]|[];
  const isAuth = req.user ? true : false;
  try {
    books = await Book.find()
                      .sort({ createdAt: "desc" })
                      .limit(9)
                      .lean();
    res.render("main", { books, isAuth });
  } catch(error) {
    books = [];
    console.log("Is Authorized? ", isAuth);
    res.render("main", {
      error: "Error: Could not get books",
      isAuth: isAuth
    });
  }
});

// @route   GET /logout
// @desc    Logout the current user
// @access  Private
router.get("/logout", isAuthenticated, (req: Request, res: Response) => {
  req.logout();
  setTimeout(() => {
    res.redirect("/");
  }, 1000);
});