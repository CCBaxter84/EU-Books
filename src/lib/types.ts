// Import libraries and dependencies
import { Request, Response, NextFunction } from "express";

// Define and export interfaces & types
export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): void
}
export type Form = "authors/new" | "auth/login" | "auth/register" | "reset/reset" | "reset/reset-confirm" | "books/new";
