// Import dependencies
import { Router, Request, Response } from "express";
import UserVerification from "../models/userVerification";
import User from "../models/user";
import { isValidVerifyToken } from "../lib/middleware/auth";
import { sendEmail } from "../lib/nodemailer";

// Declare and export router
export const router = Router();

// Define routes

// @route   GET /verify/:token
// @desc    Render form for verifying user
// @access  Public
router.get("/:token", isValidVerifyToken, async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    // Get user via token
    const errorMsg = "Error fetching user"
    const userToken = await UserVerification.findOne({ token: token });
    if (!userToken) {
      throw errorMsg;
    }
    const user = await User.findById(userToken.user).lean();
    if (!user) {
      throw errorMsg;
    }
    // Render verify template to view & pass it the user and token info
    res.render("auth/verify", {
      user,
      token,
      csrfToken: req.csrfToken(),
    });
  } catch(error) {
    res.send(error);
  }
});

// @route   POST /verify/:token
// @desc    Submit form for verifying the new user
// @access  Public
router.post("/:token", isValidVerifyToken, async (req: Request, res: Response) => {
  // Grad token from request object
  const { token } = req.params;
  const errorMsg = "Error approving user account request";
  try {
    // Get the user from Database
    const tokenDoc = await UserVerification.findOne({ token });
    if (!tokenDoc) {
      throw errorMsg;
    }
    const user = await User.findById(tokenDoc.user);
    if (!user) {
      throw errorMsg;
    }
    // Update user's locked and verified fields
    user.locked = false;
    user.verified = true;
    await user.save();
    // Delete the token w/o using .remove() to avoid also deleting the user
    await UserVerification.findByIdAndDelete(tokenDoc._id);
    // Send notification email to approved user
    sendEmail({
      to: user.email,
      subject: "New User Request",
      text: `The site admin has approved your request for an account. You can now log in at the following link: ${process.env.DOMAIN}/login`
    });
    // Redirect to main page
    res.redirect("/");
  } catch(error) {
    res.send(error);
  }
});

// @route   DELETE /verify/:token
// @desc    Submit form for verifying the new user
// @access  Public
router.delete("/:token", isValidVerifyToken, async (req: Request, res: Response) => {
  // Grab token from request object
  const { token } = req.params;
  const errorMsg = "Error Denying user account request";
  try {
    // Fetch token document from database
    const tokenDoc = await UserVerification.findOne({ token });
    if (!tokenDoc) {
      throw errorMsg;
    }
    // Fetch user ASW token from database
    const user = await User.findById(tokenDoc.user);
    if (!user) {
      throw errorMsg;
    }
    // Delete token DB document
    await tokenDoc.remove();
    // Send notification email to user ASW token
    sendEmail({
      to: user.email,
      subject: "New User Request",
      text: "The site admin has denied your request for a user account."
    });
    res.redirect("/");
  } catch(error) {
    res.send(error);
  }
});

