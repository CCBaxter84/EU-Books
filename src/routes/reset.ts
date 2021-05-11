// Import dependencies
import { Router, Request, Response } from "express";
import { v4 } from "uuid";
import PasswordReset from "../models/passwordReset";
import User from "../models/user";
import { checkResetForm, isValidEmail } from "./middleware";

// Declare and export router
export const router = Router();

// Define routes

// @route   GET /reset
// @desc    Render form for requesting a password reset
// @access  Public
router.get("/", (req: Request, res: Response) => {
  res.render("reset/reset", {
    csrfToken: req.csrfToken(), isAuth: false
  });
});

// @route   POST /reset
// @desc    Submit form for requesting a password reset
// @access  Public
router.post("/", checkResetForm, isValidEmail, async (req: Request, res: Response) => {
  const token = v4().toString().replace(/-/g, "");
  try {
    const user = await User.findOne({ email: req.body.email });
    const updateResponse = await PasswordReset.updateOne({
      user: user?._id
    }, {
      user: user?._id,
      token: token
    }, {
      upsert: true
    }
    );
    const resetLink = `${process.env.DOMAIN}/reset-confirm/${token}`;
    console.log(resetLink);
    res.render("auth/login", {
      error: "Check your email address for the password reset link"
    });
  } catch {
    res.render("reset/reset", {
      csrfToken: req.csrfToken(),
      error: "Failed to generate reset link. Please try again."
    });
  }
});
