// Import dependencies
import { Router, Request, Response } from "express";
import { v4 } from "uuid";
import PasswordReset from "../models/passwordReset";
import User from "../models/user";
import { isValidToken, passwordsNotEmpty, passwordsMatch } from "./middleware";
import { generatePassword } from "../lib/passwordUtils";

// Declare and export router
export const router = Router();

// Define routes

// @route   GET /reset-confirm/:token
// @desc    Render form for updating password
// @access  Public
router.get("/:token", isValidToken, async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    res.render("reset/reset-confirm", {
      token,
      csrfToken: req.csrfToken(),
    });
  } catch {

  }
});

// @route   POST /reset-confirm/:token
// @desc    Submit form for updating password
// @access  Public
router.post("/:token", passwordsNotEmpty, passwordsMatch,isValidToken, async (req: Request, res: Response) => {
  // Get token from Request
  const { token } = req.params;
  try {
    // Get passwordReset and user from Database
    const passwordReset = await PasswordReset.findOne({ token });
    const user = await User.findOne({ _id: passwordReset?.user });
    // Guard clause in case user is not found
    if (!user) {
      throw "Error looking up user"
    }
    user.passwordHash = generatePassword(req.body.password);
    await user.save();
    await PasswordReset.deleteOne({ _id: passwordReset?._id });

    res.render("auth/login", {
      error: "Password updated",
      csrfToken: req.csrfToken()
    });
  } catch(error) {
    res.render("reset/reset-confirm", {
      error,
      csrfToken: req.csrfToken(),
      token
    });
  }
});
