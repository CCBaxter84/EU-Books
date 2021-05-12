// Import dependencies
import { Router, Request, Response } from "express";
import UserVerification from "../models/userVerification";
import { isValidVerifyToken } from "../lib/middleware/auth";
import { sendEmail } from "../lib/nodemailer";

// Declare and export router
export const router = Router();

// Define routes

// @route   GET /verify/:token
// @desc    Render form for verifying user
// @access  Public
router.get("/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  try {

    res.render("auth/verify", {
      user: "fill_me_in",
      token
    });
  } catch(error) {

  }

});

// @route   POST /verify/:token
// @desc    Submit form for verifying the new user
// @access  Public
router.post("/:token", async (req: Request, res: Response) => {

});
