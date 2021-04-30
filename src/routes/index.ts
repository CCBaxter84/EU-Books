// Import dependencies
import { Router, Request, Response } from "express";

// Define and export router
export const router = Router();

// @route GET /
// @desc  Render main page to the screen
router.get("/", async (req: Request, res: Response) => {
  try {
    res.render("main");
  } catch {
    res.send("Hold on to your butts");
  }
});