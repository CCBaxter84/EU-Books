// Import libraries and dependencies
import { Request, Response, NextFunction } from "express";

// Define and export middleware interface
export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): void
}