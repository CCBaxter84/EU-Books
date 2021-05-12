// Import dependencies
import { Router, Request, Response } from "express";
import Book, { IBook } from "../models/book";
import { generatePassword } from "../lib/passwordUtils";
import { isAuthenticated, isNotAlreadyLoggedIn, checkForUserName, checkForEmail, regFormChecker } from "../lib/middleware";
import User from "../models/user";

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

// @route   GET /registration
// @desc    Submit and authenticate username and password
// @access  Public
router.get("/registration", isNotAlreadyLoggedIn, (req: Request, res: Response) => {
  res.render("auth/register",
    { csrfToken: req.csrfToken() });
});

// @route   POST /registration
// @desc    Submit new user to database
// @access  Public
router.post("/registration", regFormChecker, checkForEmail, checkForUserName, async (req: Request, res: Response) => {
  try {
    const passwordHash = generatePassword(req.body.password);
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      passwordHash: passwordHash,
    });
    await newUser.save();
    res.redirect("/login");
  } catch(error) {
    res.render("auth/register", {
      csrfToken: req.csrfToken(),
      error: error
    });
  }
});