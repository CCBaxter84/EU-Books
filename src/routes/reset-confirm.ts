// Import dependencies
import { Router, Request, Response } from "express";
import { v4 } from "uuid";
import PasswordReset from "../models/passwordReset";
import User from "../models/user";
import { isValidToken, passwordsNotEmpty, passwordsMatch } from "./middleware";

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
  try {
    res.send("your mom");
  } catch(error) {
    res.send(error);
  }
});
