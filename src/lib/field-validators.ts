// Import libraries and dependencies
import { Request} from "express";
import { IPasswordChecker, IRenderer, IChecker,
IProps } from "./types-interfaces";
import { EMAIL_REGEX } from "./global-constants";

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

export const isLongPassword: IPasswordChecker = (password, length = 12) => {
  return password.length >= length;
}

export const isComplexPassword: IPasswordChecker = password => {
  return EMAIL_REGEX.test(password);
}