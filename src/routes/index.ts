// Import dependencies
import { Router, Request, Response } from "express";
import Book, { IBook } from "../models/book";
import passport from "../config/passport";
import { generatePassword } from "../lib/passwordUtils";
import { isAuthenticated } from "./middleware";
import User from "../models/user";

// Define and export router
export const router = Router();

// @route    GET /
// @desc     Render main page to the screen
// @access   Public
router.get("/", async (req: Request, res: Response) => {
  let books: IBook[]|[];
  let isAuth = req.user ? true : false;
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

// @route   GET /login
// @desc    Render Log In form
// @access  Public
router.get("/login",  (req, res) => {
  res.render("auth/login", { csrfToken: req.csrfToken() });
});

// @route   POST /login
// @desc    Submit and authenticate username and password
// @access  Public
router.post("/login", passport.authenticate("local", { failureRedirect: "/", successRedirect: "/" }));

// @route   GET /logout
// @desc    Logout the current user
// @access  Private
router.get("/logout", isAuthenticated, (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/registration", (req, res) => {

  res.render("auth/register");
});

router.post("/registration", async (req, res) => {
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
    res.send(error);
  }

});