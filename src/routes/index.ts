// Import dependencies
import { Router, Request, Response } from "express";

// Define and export router
export const router = Router();

// @route GET /
// @desc  Render main page to the screen
router.get("/", (req: Request, res: Response) => {
  res.send("main");
});