// Import libraries and dependencies
import { Request, Response } from "express";
import { Form } from "./types";

// Form types & interfaces
type Prop = "name" | "email" | "username" | "password" | "confirm";
interface IChecker {
  (prop: Prop, req: Request): boolean
}
interface IRenderer {
  (form: Form, req: Request, res: Response, error: string, token?: string): void
}
interface IProps {
  csrfToken: string,
  error: string,
  token?: string
}

// Form checking and rendering helper functions
export const hasValue: IChecker = (prop, req) => req.body[prop] && req.body[prop] !== "";

export const renderForm: IRenderer = (form, req, res, error, token) => {
  let data: IProps = {
    csrfToken: req.csrfToken(),
    error
  }
  if (token) {
    data.token = token ;
  }
  res.render(form, data);
}

export const hasEmail = (req: Request): boolean => {
  return hasValue("email", req);
}