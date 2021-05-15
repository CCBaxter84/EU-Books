// Import libraries and dependencies
import { IMiddleware } from "../form-types";
import PasswordReset from "../../models/passwordReset";
import UserVerification from "../../models/userVerification";
import { renderError } from "../error-utils";

// Middleware for checking user authentication
export const isAuthenticated: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    renderError("unauth", res, false);
  }
};

export const isNotAlreadyLoggedIn: IMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};

// Middleware for checking whether user is an admin
export const isAdmin: IMiddleware = (req, res, next) => {
  const isAuth = req.isAuthenticated();
  if (isAuth && req.user?.admin === true) {
    next();
  } else {
    renderError("unauth", res, isAuth);
  }
};

export const isValidResetToken: IMiddleware = async function(req, res, next) {
  try {
    const { token } = req.params;
    const passwordReset = await PasswordReset.findOne({ token });
    if (!passwordReset) {
      throw new Error();
    } else {
      next();
    }
  } catch {
    renderError("not-found", res, req.isAuthenticated());
  }
};

export const isValidVerifyToken: IMiddleware = async function(req, res, next) {
  try {
    const { token } = req.params;
    const userVerification = await UserVerification.findOne({ token });
    if (!userVerification) {
      throw new Error();
    } else {
      next();
    }
  } catch {
    renderError("not-found", res, req.isAuthenticated());
  }
};

export const passwordsMatch: IMiddleware = function(req, res, next) {
  // Check if passwords match -- if yes, proceed
  const { token } = req.params;
  const { password, confirm } = req.body;
  if (password === confirm) {
    next();
  } else {
    res.render("reset/reset-confirm", {
      csrfToken: req.csrfToken(),
      error: "Error: Passwords do not match.",
      token
    });
  }
}