// Import dependencies
import { Router, Request, Response } from "express";
import { v4 } from "uuid";
import PasswordReset from "../models/passwordReset";
import User from "../models/user";

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
router.post("/", async (req: Request, res: Response) => {
  try {

  } catch {

  }
});
