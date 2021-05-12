// Import dependencies
import { Router, Request, Response } from "express";
import { generatePassword } from "../lib/passwordUtils";
import { isNotAlreadyLoggedIn, checkForUserName, checkForEmail, regFormChecker } from "../lib/middleware";
import User from "../models/user";

// Define and export router
export const router = Router();

// @route   GET /registration
// @desc    Submit and authenticate username and password
// @access  Public
router.get("/", isNotAlreadyLoggedIn, (req: Request, res: Response) => {
  res.render("auth/register",
    { csrfToken: req.csrfToken() });
});

// @route   POST /registration
// @desc    Submit new user to database
// @access  Public
router.post("/", regFormChecker, checkForEmail, checkForUserName, async (req: Request, res: Response) => {
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