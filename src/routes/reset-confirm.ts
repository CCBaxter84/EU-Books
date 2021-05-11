// Import dependencies
import { Router, Request, Response } from "express";
import { v4 } from "uuid";
import PasswordReset from "../models/passwordReset";
import User from "../models/user";

// Declare and export router
export const router = Router();

// Define routes

// @route   GET /reset-confirm/:token
// @desc    Render form for updating password
// @access  Public
router.get("/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  try {

  } catch {

  }
});

// @route   POST /reset-confirm/:token
// @desc    Submit form for updating password
// @access  Public
router.post("/:token", async (req: Request, res: Response) => {
  try {

  } catch {

  }
});
