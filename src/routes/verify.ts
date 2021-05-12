// Import dependencies
import { Router, Request, Response } from "express";
import UserVerification from "../models/userVerification";
import { isValidToken } from "../lib/middleware";

// Declare and export router
export const router = Router();

// Define routes

// @route   GET /verify/:token
// @desc    Render form for updating password
// @access  Public
router.get("/:token", async (req: Request, res: Response) => {
  res.render("auth/verify");
});

// @route   POST /verify/:token
// @desc    Submit form for updating password
// @access  Public
router.post("/:token", isValidToken, async (req: Request, res: Response) => {

});
