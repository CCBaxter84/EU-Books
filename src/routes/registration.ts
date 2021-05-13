// Import .env file if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import dependencies
import { Router, Request, Response } from "express";

import { generatePassword } from "../lib/passwordUtils";
import { isNotAlreadyLoggedIn } from "../lib/middleware/auth";
import { checkForUserName, checkForEmail, regFormChecker, isStrongPassword, isEmail } from "../lib/middleware/forms";
import { createToken, sendEmail } from "../lib/nodemailer";
import User from "../models/user";
import UserVerification from "../models/userVerification";

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
router.post("/", regFormChecker, isEmail, checkForEmail, checkForUserName, isStrongPassword, async (req: Request, res: Response) => {
  try {
    const passwordHash = generatePassword(req.body.password);
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      passwordHash: passwordHash,
    });
    const savedUser = await newUser.save();

    // Create token & verify link
    const token = createToken();
    const verifyLink = `${process.env.DOMAIN}/verify/${token}`;

    // Save the token to user verification
    const userToken = new UserVerification({
      user: savedUser._id,
      token
    });
    await userToken.save();

    // Email the link to approve/deny the request
    sendEmail({
      to: "" + process.env.EMAIL_ADDRESS,
      subject: "New User Request",
      text: `A new user has requested site access. Here's a link to approve or deny the request: ${verifyLink}`
    });
    res.render("auth/login", {
      csrfToken: req.csrfToken(),
      error: "Site access request sent. Please check for your email for approval notification.",
      isAuth: false
    });
  } catch(error) {
    res.render("auth/register", {
      csrfToken: req.csrfToken(),
      error: error
    });
  }
});