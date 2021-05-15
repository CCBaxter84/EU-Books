// Import dependencies
import { Router, Request, Response } from "express";
import Book from "../models/book";
import { isAuthenticated } from "../lib/middleware/auth";
import { PAGE_ERR, BAD_REQ_ERR } from "../lib/global-constants";

// Define and export router
export const router = Router();

// @route    GET /
// @desc     Render main page to the screen
// @access   Public
router.get("/", async (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;
  try {
    const books = await Book.find()
                      .sort({ createdAt: "desc" })
                      .limit(12)
                      .lean();
    res.render("main", { books, isAuth });
  } catch {
    res.render("error", {
      img: "/img/lando.jpg",
      errorMsg: PAGE_ERR,
      isAuth: isAuth
    });
  }
});

// @route   GET /logout
// @desc    Logout the current user
// @access  Private
router.get("/logout", isAuthenticated, (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
});

// @route   GET /:any
// @desc    Error handling for bad route
// @access  Public
router.get("/:any", (req: Request, res: Response) => {
  const isAuth = req.user ? true : false;

  res.render("error", {
    img: "/img/obi-wan.jpg",
    errorMsg: BAD_REQ_ERR,
    isAuth
  });
});