// Import libraries and dependencies
import { Request, Response, NextFunction } from "express";

// Define and export types
type Prop = "name" | "email" | "username" | "password" | "confirm";
export type Form = "authors/new" | "auth/login" | "auth/register" | "reset/reset" | "reset/reset-confirm";

// Define and export interfaces
export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): void
}
export interface IChecker {
  (prop: Prop, req: Request): boolean
}
export interface IRenderer {
  (form: Form, req: Request, res: Response, error: string, token?: string): void
}
export interface IProps {
  csrfToken: string,
  error: string,
  token?: string
}
export interface IPasswordChecker {
  (password: string, length?: number): boolean
}