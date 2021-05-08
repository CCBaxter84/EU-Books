// Import dependencies
import { Router, Request, Response } from "express";
import Book, { IBook } from "../models/book";
import passport from "../config/passport";
import { generatePassword } from "../lib/passwordUtils";
import User from "../models/user";

// Define and export router
export const router = Router();

// @route GET /
// @desc  Render main page to the screen
router.get("/", async (req: Request, res: Response) => {
  let books: IBook[]|[];
  try {
    books = await Book.find()
                      .sort({ createdAt: "desc" })
                      .limit(9)
                      .lean();
    res.render("main", { books });
  } catch(error) {
    books = [];
    res.render("main", { error: "Error: Could not get books" });
  }
});

router.get("/login",  (req, res) => {
  res.render("auth/login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/", successRedirect: "/books" }));

router.get("/logout", (req, res) => {
  res.send("Logout page");
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